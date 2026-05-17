import { prisma } from "../utils/prisma";

export const confirmBookingService = async (bookingId: string) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        tickets: true,
        user: true,
      },
    });
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status === "confirmed") {
      return booking;
    }

    if (booking.paymentStatus !== "paid") {
      throw new Error("Cannot confirm unpaid booking");
    }

    const updateBooking = await tx.booking.update({
      where: {
        id: bookingId,
      },
      include: {
        tickets: true,
        user: true,
      },

      data: {
        status: "confirmed",
      },
    });

    const showtimeSeatIds = booking.tickets.map(
      (ticket) => ticket.showtimeSeatId,
    );

    if (showtimeSeatIds.length > 0) {
      await tx.showtimeSeat.updateMany({
        where: {
          id: {
            in: showtimeSeatIds,
          },
        },
        data: {
          status: "booked",
          lockedUntil: null,
        },
      });
    }

    await tx.bookingTicket.updateMany({
      where: { bookingId },
      data: {
        checkinStatus: false,
      },
    });

    return updateBooking;
  });
};
