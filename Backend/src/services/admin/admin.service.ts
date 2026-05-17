import { prisma } from "../../utils/prisma";
import { redis } from "../../utils/redis";

const DASHBOARD_STATS_CACHE_KEY = "admin:dashboard:stats";
const DASHBOARD_STATS_CACHE_TTL = Number(process.env.CACHE_TTL) || 60;

export const getDashboardStatsService = async () => {
  const cached = await redis.get(DASHBOARD_STATS_CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const totalUsers = await prisma.user.count();

  const totalBookings = await prisma.booking.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },

    where: {
      status: "paid",
    },
  });

  const todayBookings = await prisma.booking.count({
    where: {
      bookedAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  const cancelledBookings = await prisma.booking.count({
    where: {
      status: "cancelled",
    },
  });

  const stats = {
    totalUsers,
    totalBookings,
    totalRevenue: totalRevenue._sum.amount || 0,
    todayBookings,
    cancelledBookings,
  };

  await redis.set(
    DASHBOARD_STATS_CACHE_KEY,
    JSON.stringify(stats),
    "EX",
    DASHBOARD_STATS_CACHE_TTL,
  );

  return stats;
};
