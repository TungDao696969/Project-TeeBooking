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
import { PaymentMethod } from "../generated/prisma/enums";

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
    await markPaymentPaid(paymentId, String(vnpParams.vnp_TransactionNo));
    return "Thanh toan thanh cong";
  }

  await markPaymentFailed(paymentId);
  return "Thanh toan that bai";
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
  await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.status === "paid") return;

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
  });
};

const markPaymentFailed = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment || payment.status === "paid") return;

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
};
