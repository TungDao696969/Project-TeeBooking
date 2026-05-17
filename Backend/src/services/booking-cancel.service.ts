import { prisma } from "../utils/prisma";
import dayjs from "dayjs";

export const cancelBookingService = async ({
  bookingId,
  userId,
}: {
  bookingId: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      include: {
        showtime: true,
        payments: true,
        tickets: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (["cancelled", "completed", "refunded"].includes(booking.status)) {
      throw new Error(`Cannot cancel ${booking.status} booking`);
    }

    // chỉ cancel trước 30 phút
    const cutoffTime = dayjs(booking.showtime.startTime).subtract(30, "minute");

    if (dayjs().isAfter(cutoffTime)) {
      throw new Error(
        "Booking cannot be cancelled less than 30 minutes before showtime",
      );
    }

    // update booking
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: "cancelled",
      },
    });

    // release seats if any
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
          status: "available",
          lockedUntil: null,
        },
      });
    }

    // if already paid, mark refund flow
    const paidPayment = booking.payments.find(
      (payment: any) => payment.status === "paid",
    );

    if (paidPayment) {
      await tx.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: "refunded",
        },
      });
    }

    return {
      success: true,
      message: "Booking cancelled successfully",
    };
  });
};
