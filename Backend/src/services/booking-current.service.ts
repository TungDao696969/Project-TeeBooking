import { prisma } from "../utils/prisma";

export const getCurrentBookingService = async (userId: string) => {
  const booking = await prisma.booking.findFirst({
    where: {
      userId,
      OR: [
        {
          status: "pending",
        },
        {
          status: "confirmed",
        },
      ],
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
    },
    orderBy: {
      bookedAt: "desc",
    },
  });

  return booking;
};
