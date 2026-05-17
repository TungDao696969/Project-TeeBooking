import { prisma } from "../utils/prisma";

interface GetPastBookingsParams {
  userId: string;
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
export const getPastBookingsService = async ({
  userId,
  page = 1,
  limit = 10,
  status,
  search,
}: GetPastBookingsParams) => {
  const skip = (page - 1) * limit;

  const whereClause: any = {
    userId,
    status: {
      in: ["completed", "cancelled", "refunded"],
    },
  };

  if (status) {
    whereClause.status = status;
  }

  if (search) {
    whereClause.bookingCode = {
      contains: search,
      mode: "insensitive",
    };
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: whereClause,
      include: {
        showtime: {
          include: {
            movie: true,
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
        payments: true,
        invoice: true,
      },
      orderBy: {
        bookedAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.booking.count({
      where: whereClause,
    }),
  ]);

  return {
    data: bookings,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getBookingHistoryDetail = async (
  bookingId: string,
  userId: string,
) => {
  return prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },
    include: {
      showtime: {
        include: {
          movie: true,
          room: true,
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
      combos: true,
      payments: true,
      invoice: true,
    },
  });
};
