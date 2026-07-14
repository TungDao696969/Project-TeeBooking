// booking.service.ts

import { prisma } from "../utils/prisma";

import { redis } from "../utils/redis";
import { BookingStatus } from "../generated/prisma/enums";
import { generateBookingCode } from "../utils/booking-code";
import { CreateBookingInput } from "../validations/booking.schema";

const LOCK_TIME = 300;

export const createBookingService = async (
  userId: string,
  payload: CreateBookingInput,
) => {
  const { showtimeId, seatIds, comboIds, tickets } = payload;

  //--------------------------------
  // 1. Showtime
  //--------------------------------

  const showtime = await prisma.showtime.findFirst({
    where: {
      id: showtimeId,
      deletedAt: null,
    },
  });

  if (!showtime) {
    throw new Error("Showtime not found");
  }

  //--------------------------------
  // 2. Ghế
  //--------------------------------

  const seats = await prisma.showtimeSeat.findMany({
    where: {
      id: {
        in: seatIds,
      },
      showtimeId,
    },
    include: {
      seat: true,
    },
  });

  if (seats.length !== seatIds.length) {
    throw new Error("Seat not found");
  }

  //--------------------------------
  // 3. Check booked
  //--------------------------------

  const bookedSeat = seats.find((seat) => seat.status === "booked");

  if (bookedSeat) {
    throw new Error("Seat already booked");
  }

  //--------------------------------
  // 4. Redis Lock
  //--------------------------------

  const lockedSeats: string[] = [];

  try {
    for (const seatId of seatIds) {
      const lockKey = `seat-lock:${seatId}`;

      const locked = await redis.set(lockKey, userId, "EX", LOCK_TIME, "NX");

      if (!locked) {
        throw new Error(`Seat ${seatId} is being reserved`);
      }
      lockedSeats.push(lockKey);
    }

    //--------------------------------
    // 5. Ticket Price
    //--------------------------------

    let totalTicketPrice = 0;

    if (tickets && tickets.length > 0) {
      let ticketSum = 0;
      for (const t of tickets) {
        ticketSum += t.price * t.quantity;
      }

      let extraSum = 0;
      seats.forEach((seat) => {
        extraSum += Number(seat.seat.extraPrice || 0);
      });

      totalTicketPrice = ticketSum + extraSum;
    } else {
      seats.forEach((seat) => {
        totalTicketPrice += seat.finalPrice;
      });
    }

    //--------------------------------
    // 6. Combo Price
    //--------------------------------

    let totalComboPrice = 0;

    const bookingCombos: {
      comboId: string;
      quantity: number;
      price: number;
      totalPrice: number;
    }[] = [];

    if (comboIds?.length) {
      for (const item of comboIds) {
        const combo = await prisma.foodCombo.findUnique({
          where: {
            id: item.comboId,
          },
        });

        if (!combo) continue;

        totalComboPrice += combo.price * item.quantity;

        bookingCombos.push({
          comboId: combo.id,
          quantity: item.quantity,
          price: combo.price,
          totalPrice: combo.price * item.quantity,
        });
      }
    }

    //--------------------------------
    // 7. Final Amount
    //--------------------------------

    const finalAmount = totalTicketPrice + totalComboPrice;

    //--------------------------------
    // 8. Create Booking
    //--------------------------------

    const booking = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          bookingCode: generateBookingCode(),

          userId,

          showtimeId,

          totalTicketPrice,

          totalComboPrice,

          discountAmount: 0,

          finalAmount,

          status: BookingStatus.pending,

          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      //--------------------------------
      // Tickets
      //--------------------------------

      await tx.bookingTicket.createMany({
        data: seats.map((seat) => {
          const tPrice =
            tickets && tickets.length > 0
              ? totalTicketPrice / seats.length
              : seat.finalPrice;

          return {
            bookingId: booking.id,
            showtimeSeatId: seat.id,
            ticketPrice: tPrice,
          };
        }),
      });

      //--------------------------------
      // Lock Seats
      //--------------------------------

      await tx.showtimeSeat.updateMany({
        where: {
          id: {
            in: seats.map((s) => s.id),
          },
        },
        data: {
          status: "reserved",
          lockedUntil: booking.expiresAt,
        },
      });

      //--------------------------------
      // Combos
      //--------------------------------

      if (bookingCombos.length) {
        await tx.bookingCombo.createMany({
          data: bookingCombos.map((combo) => ({
            bookingId: booking.id,
            comboId: combo.comboId,
            quantity: combo.quantity,
            unitPrice: combo.price,
            totalPrice: combo.totalPrice,
          })),
        });
      }

      return booking;
    });

    await redis.del(`showtime:${showtimeId}:seats`);

    return booking;
  } finally {
    if (lockedSeats.length > 0) {
      await redis.del(...lockedSeats);
    }
  }
};
