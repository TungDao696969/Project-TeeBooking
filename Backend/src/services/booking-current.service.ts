import { prisma } from "../utils/prisma";

export const getBookingDetailService = async (
  bookingId: string,
  userId: string,
) => {
  console.log("bookingId", bookingId);
  console.log("userId", userId);
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },

    include: {
      showtime: {
        include: {
          movie: true,

          room: {
            include: {
              cinema: true,
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
