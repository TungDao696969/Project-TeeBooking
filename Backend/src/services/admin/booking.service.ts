import { prisma } from "../../utils/prisma";
import { redis } from "../../utils/redis";
import { BookingStatus } from "../../generated/prisma/enums";

interface GetAdminBookingsOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: BookingStatus;
}

export const getAdminBookingsService = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
}: GetAdminBookingsOptions) => {
  const skip = (page - 1) * limit;

  const whereClause: any = {};

  if (status) {
    whereClause.status = status;
  }

  if (search) {
    whereClause.OR = [
      { bookingCode: { contains: search, mode: "insensitive" } },
      { user: { email: { contains: search, mode: "insensitive" } } },
      { user: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.booking.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        bookedAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
        showtime: {
          include: {
            movie: {
              select: {
                id: true,
                title: true,
              },
            },
            room: {
              select: {
                id: true,
                roomName: true,
                cinema: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.booking.count({
      where: whereClause,
    }),
  ]);

  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAdminBookingDetailService = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          avatarUrl: true,
        },
      },
      showtime: {
        include: {
          movie: {
            select: {
              id: true,
              title: true,
              posterUrl: true,
            },
          },
          room: {
            select: {
              id: true,
              roomName: true,
              cinema: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                },
              },
            },
          },
        },
      },
      tickets: {
        include: {
          showtimeSeat: {
            include: {
              seat: true,
            },
          },
        },
      },
      combos: {
        include: {
          combo: true,
        },
      },
      payments: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

// ─── Allowed status transitions ────────────────────────────────────────────
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  pending:   ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: ["refunded"],
  cancelled: ["refunded"],
  refunded:  [],
};

export const updateAdminBookingStatusService = async (
  id: string,
  newStatus: BookingStatus,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { tickets: true, payments: true },
  });

  if (!booking) throw new Error("Booking not found");

  const allowed = ALLOWED_TRANSITIONS[booking.status] ?? [];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Cannot transition from ${booking.status} to ${newStatus}`);
  }

  return prisma.$transaction(async (tx) => {
    // Update booking status
    const updated = await tx.booking.update({
      where: { id },
      data: { status: newStatus },
    });

    // If cancelled → release seats
    if (newStatus === "cancelled") {
      const seatIds = booking.tickets.map((t) => t.showtimeSeatId);
      if (seatIds.length > 0) {
        await tx.showtimeSeat.updateMany({
          where: { id: { in: seatIds } },
          data: { status: "available", lockedUntil: null },
        });
      }
    }

    // If refunded → create refund record for paid payments
    if (newStatus === "refunded") {
      const paidPayments = booking.payments.filter((p: any) => p.status === "paid");
      for (const payment of paidPayments) {
        await tx.refund.create({
          data: {
            bookingId: id,
            paymentId: payment.id,
            refundAmount: payment.amount,
            refundReason: "Admin manual refund",
            refundStatus: "processed",
            processedAt: new Date(),
          },
        });
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: "refunded" },
        });
      }
      await tx.booking.update({
        where: { id },
        data: { paymentStatus: "refunded" },
      });
    }

    return updated;
  });
};

export const adminCancelBookingService = async (
  id: string,
  { refund }: { refund: boolean },
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { tickets: true, payments: true },
  });

  if (!booking) throw new Error("Booking not found");

  if (["cancelled", "refunded"].includes(booking.status)) {
    throw new Error(`Booking is already ${booking.status}`);
  }

  return prisma.$transaction(async (tx) => {
    // Cancel booking
    await tx.booking.update({
      where: { id },
      data: { status: "cancelled" },
    });

    // Release seats
    const seatIds = booking.tickets.map((t) => t.showtimeSeatId);
    if (seatIds.length > 0) {
      await tx.showtimeSeat.updateMany({
        where: { id: { in: seatIds } },
        data: { status: "available", lockedUntil: null },
      });
    }

    // If refund requested, process it
    if (refund) {
      const paidPayments = booking.payments.filter((p: any) => p.status === "paid");
      for (const payment of paidPayments) {
        await tx.refund.create({
          data: {
            bookingId: id,
            paymentId: payment.id,
            refundAmount: payment.amount,
            refundReason: "Admin cancelled booking",
            refundStatus: "processed",
            processedAt: new Date(),
          },
        });
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: "refunded" },
        });
      }
      await tx.booking.update({
        where: { id },
        data: { status: "refunded", paymentStatus: "refunded" },
      });
    }

    return {
      success: true,
      message: refund ? "Booking cancelled and refunded" : "Booking cancelled",
    };
  });
};
