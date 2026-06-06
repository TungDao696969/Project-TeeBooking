import { prisma } from "../../utils/prisma";
import { redis } from "../../utils/redis";

const DASHBOARD_STATS_CACHE_KEY = "admin:dashboard:stats";
const DASHBOARD_STATS_CACHE_TTL = Number(process.env.CACHE_TTL) || 60;

export const getDashboardStatsService = async () => {
  const cached = await redis.get(DASHBOARD_STATS_CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    totalMovies,
    totalCinemas,
    totalRooms,
    totalSeats,
    totalShowtimes,
    totalBookings,
    todayBookings,
    cancelledBookings,

    totalRevenue,
    todayRevenue,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.movie.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.cinema.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.cinemaRoom.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.seat.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.showtime.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.booking.count(),

    prisma.booking.count({
      where: {
        bookedAt: {
          gte: todayStart,
        },
      },
    }),

    prisma.booking.count({
      where: {
        status: "cancelled",
      },
    }),

    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },

      where: {
        status: "paid",
      },
    }),

    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },

      where: {
        status: "paid",

        createdAt: {
          gte: todayStart,
        },
      },
    }),

    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },

      where: {
        status: "paid",

        createdAt: {
          gte: monthStart,
        },
      },
    }),
  ]);

  const stats = {
    totalRevenue: totalRevenue._sum.amount || 0,
    todayRevenue: todayRevenue._sum.amount || 0,
    monthlyRevenue: monthlyRevenue._sum.amount || 0,

    totalBookings,
    todayBookings,
    cancelledBookings,

    totalUsers,

    totalMovies,
    totalCinemas,
    totalRooms,
    totalShowtimes,
    totalSeats,
  };

  const result = {
    stats,
  };

  await redis.set(
    DASHBOARD_STATS_CACHE_KEY,
    JSON.stringify(result),
    "EX",
    DASHBOARD_STATS_CACHE_TTL,
  );

  return result;
};
