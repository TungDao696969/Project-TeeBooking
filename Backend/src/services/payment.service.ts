import dayjs from "dayjs";
import { prisma } from "../utils/prisma";
import crypto from "crypto";
import qs from "qs";
import {
  buildVnpayPaymentUrl,
  createSecureHash,
  fromVnpayTxnRef,
  toVnpayTxnRef,
} from "../utils/vnpay";
import {
  BookingPaymentStatus,
  BookingStatus,
  PaymentMethod,
} from "../generated/prisma/enums";
import { enqueuePaymentSuccessJob } from "../queue/payment-success.queue";

export interface PaymentBookingPayload {
  showtimeId: string;
  seats: Array<{
    seatId: string;
  }>;
  combos: Array<{
    comboId: string;
    quantity: number;
  }>;
  tickets: Array<{
    ticketTypeId: string;
    quantity: number;
  }>;
  voucherCode?: string;
}

const generateBookingCode = async () => {
  const suffix = Math.floor(Math.random() * 900000 + 100000).toString();
  const code = `BK${suffix}`;
  const existing = await prisma.booking.findUnique({
    where: { bookingCode: code },
  });

  if (existing) {
    return generateBookingCode();
  }

  return code;
};

export const createBookingFromPaymentPayload = async (
  userId: string,
  payload: PaymentBookingPayload,
) => {
  const { showtimeId, seats, combos, voucherCode } = payload;

  if (!showtimeId) {
    throw new Error("Missing showtimeId");
  }

  if (!Array.isArray(seats) || seats.length === 0) {
    throw new Error("At least one seat must be selected");
  }

  const showtime = await prisma.showtime.findUnique({
    where: { id: showtimeId },
  });

  if (!showtime) {
    throw new Error("Showtime not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const selectedSeats = [] as Array<{
    id: string;
    showtimeId: string;
    seatId: string;
    finalPrice: number;
    status: string;
    seatCode?: string;
  }>;

  let totalTicketPrice = 0;

  for (const seat of seats) {
    const showtimeSeat = await prisma.showtimeSeat.findFirst({
      where: {
        showtimeId,
        seatId: seat.seatId,
      },
      include: {
        seat: true,
      },
    });

    if (!showtimeSeat) {
      throw new Error(`Seat ${seat.seatId} not found for showtime`);
    }

    if (showtimeSeat.status === "booked") {
      throw new Error(`Seat ${showtimeSeat.seat.seatCode} is already booked`);
    }

    selectedSeats.push({
      id: showtimeSeat.id,
      showtimeId: showtimeSeat.showtimeId,
      seatId: showtimeSeat.seatId,
      finalPrice: Number(showtimeSeat.finalPrice),
      status: showtimeSeat.status,
      seatCode: showtimeSeat.seat.seatCode,
    });

    totalTicketPrice += Number(showtimeSeat.finalPrice);
  }

  let totalComboPrice = 0;
  const bookingCombos = [] as Array<{
    comboId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;

  for (const combo of combos) {
    const foodCombo = await prisma.foodCombo.findUnique({
      where: { id: combo.comboId },
    });

    if (!foodCombo) {
      throw new Error(`Combo ${combo.comboId} not found`);
    }

    if (!foodCombo.isActive) {
      throw new Error(`Combo ${foodCombo.name} is unavailable`);
    }

    const quantity = Number(combo.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error(`Invalid quantity for combo ${foodCombo.name}`);
    }

    const unitPrice = Number(foodCombo.price);
    const totalPrice = unitPrice * quantity;

    totalComboPrice += totalPrice;
    bookingCombos.push({
      comboId: combo.comboId,
      quantity,
      unitPrice,
      totalPrice,
    });
  }

  let discountAmount = 0;

  if (voucherCode) {
    const voucher = await prisma.voucher.findUnique({
      where: { code: voucherCode },
      include: {
        promotion: true,
      },
    });

    if (voucher && voucher.status === "active") {
      const subtotal = totalTicketPrice + totalComboPrice;

      if (voucher.promotion.type === "percentage") {
        discountAmount = subtotal * (voucher.promotion.discountValue / 100);
      } else if (voucher.promotion.type === "fixed_amount") {
        discountAmount = voucher.promotion.discountValue;
      }

      discountAmount = Math.min(discountAmount, subtotal);
    }
  }

  const finalAmount = Math.max(
    0,
    totalTicketPrice + totalComboPrice - discountAmount,
  );

  const bookingCode = await generateBookingCode();

  const booking = await prisma.$transaction(async (tx) => {
    const createdBooking = await tx.booking.create({
      data: {
        bookingCode,
        userId,
        showtimeId,
        totalTicketPrice,
        totalComboPrice,
        discountAmount,
        finalAmount,
        status: BookingStatus.pending,
        paymentStatus: BookingPaymentStatus.pending,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await tx.bookingTicket.createMany({
      data: selectedSeats.map((seat) => ({
        bookingId: createdBooking.id,
        showtimeSeatId: seat.id,
        ticketPrice: seat.finalPrice,
        qrCode: `QR-${createdBooking.bookingCode}-${seat.seatId}`,
      })),
    });

    for (const seat of selectedSeats) {
      await tx.showtimeSeat.update({
        where: { id: seat.id },
        data: {
          status: "reserved",
          lockedUntil: new Date(Date.now() + 5 * 60 * 1000),
        },
      });
    }

    if (bookingCombos.length > 0) {
      await tx.bookingCombo.createMany({
        data: bookingCombos.map((combo) => ({
          bookingId: createdBooking.id,
          comboId: combo.comboId,
          quantity: combo.quantity,
          unitPrice: combo.unitPrice,
          totalPrice: combo.totalPrice,
        })),
      });
    }

    return createdBooking;
  });

  return booking;
};

export const createVNPayPayment = async (
  bookingId: string,
  ipAddr = "127.0.0.1",
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      paymentMethod: PaymentMethod.vnpay,
      paymentGateway: "VNPAY",
      amount: booking.finalAmount,
      status: "pending",
    },
  });

  return payment;
};

export const handleVNPayReturn = async (query: any) => {
  const vnpParams = { ...query };
  const secureHash = vnpParams.vnp_SecureHash;
  delete vnpParams.vnp_SecureHash;
  delete vnpParams.vnp_SecureHashType;

  const secretKey = process.env.VNP_HASH_SECRET;
  if (!secretKey) {
    throw new Error("Missing VNPay configuration");
  }

  const checkHash = createSecureHash(vnpParams, secretKey);

  if (String(secureHash).toLowerCase() !== checkHash.toLowerCase()) {
    throw new Error("Invalid checksum");
  }

  const paymentId = fromVnpayTxnRef(String(vnpParams.vnp_TxnRef));
  const responseCode = vnpParams.vnp_ResponseCode;

  if (responseCode === "00") {
    const bookingId = await markPaymentPaid(
      paymentId,
      String(vnpParams.vnp_TransactionNo),
    );

    return {
      status: "success" as const,
      bookingId,
    };
  }

  const bookingId = await markPaymentFailed(paymentId);

  console.log("QUERY", vnpParams);
  console.log("SECURE_HASH", secureHash);
  console.log("CHECK_HASH", checkHash);
  console.log(
    "MATCH",
    String(secureHash).toLowerCase() === checkHash.toLowerCase(),
  );
  return {
    status: "failed" as const,
    bookingId,
  };
};

export const handleVNPayIPN = async (query: any) => {
  const vnpParams = { ...query };
  const secureHash = vnpParams.vnp_SecureHash;
  delete vnpParams.vnp_SecureHash;
  delete vnpParams.vnp_SecureHashType;

  const secretKey = process.env.VNP_HASH_SECRET;
  if (!secretKey) {
    return {
      RspCode: "99",
      Message: "Missing VNPay configuration",
    };
  }

  const checkHash = createSecureHash(vnpParams, secretKey);

  if (String(secureHash).toLowerCase() !== checkHash.toLowerCase()) {
    return {
      RspCode: "97",
      Message: "Invalid checksum",
    };
  }

  const paymentId = fromVnpayTxnRef(String(vnpParams.vnp_TxnRef));
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) {
    return {
      RspCode: "01",
      Message: "Order not found",
    };
  }

  if (payment.status === "paid") {
    await enqueuePaymentSuccessJob(payment.bookingId);

    return {
      RspCode: "02",
      Message: "Already confirmed",
    };
  }

  if (vnpParams.vnp_ResponseCode === "00") {
    await markPaymentPaid(paymentId, String(vnpParams.vnp_TransactionNo));
  } else {
    await markPaymentFailed(paymentId);
  }

  return {
    RspCode: "00",
    Message: "Confirm Success",
  };
};

const markPaymentPaid = async (paymentId: string, transactionCode: string) => {
  const bookingId = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) return null;

    if (payment.status === "paid") {
      return payment.bookingId;
    }

    await tx.payment.update({
      where: { id: paymentId },
      data: {
        status: "paid",
        paidAt: new Date(),
        transactionCode,
      },
    });

    await tx.booking.update({
      where: { id: payment.bookingId },
      data: {
        status: "confirmed",
        paymentStatus: "paid",
      },
    });

    // lấy danh sách ghế của booking
    const bookingTickets = await tx.bookingTicket.findMany({
      where: {
        bookingId: payment.bookingId,
      },
    });

    // update ghế sang booked
    for (const ticket of bookingTickets) {
      await tx.showtimeSeat.update({
        where: {
          id: ticket.showtimeSeatId,
        },
        data: {
          status: "booked",
          lockedUntil: null,
        },
      });
    }

    return payment.bookingId;
  });

  if (bookingId) {
    await enqueuePaymentSuccessJob(bookingId);
  }

  return bookingId;
};

const markPaymentFailed = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) return null;
  if (payment.status === "paid") return payment.bookingId;

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: paymentId },
      data: {
        status: "failed",
      },
    });

    await tx.booking.update({
      where: { id: payment.bookingId },
      data: {
        paymentStatus: "failed",
      },
    });
  });

  return payment.bookingId;
};
