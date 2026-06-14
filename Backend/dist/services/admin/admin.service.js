"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsService = void 0;
const prisma_1 = require("../../utils/prisma");
const redis_1 = require("../../utils/redis");
const DASHBOARD_STATS_CACHE_KEY = "admin:dashboard:stats";
const DASHBOARD_STATS_CACHE_TTL = Number(process.env.CACHE_TTL) || 60;
const getDashboardStatsService = async () => {
    const cached = await redis_1.redis.get(DASHBOARD_STATS_CACHE_KEY);
    if (cached) {
        return JSON.parse(cached);
    }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const [totalUsers, totalMovies, totalCinemas, totalRooms, totalSeats, totalShowtimes, totalBookings, todayBookings, cancelledBookings, totalRevenue, todayRevenue, monthlyRevenue,] = await Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.movie.count({
            where: {
                deletedAt: null,
            },
        }),
        prisma_1.prisma.cinema.count({
            where: {
                deletedAt: null,
            },
        }),
        prisma_1.prisma.cinemaRoom.count({
            where: {
                deletedAt: null,
            },
        }),
        prisma_1.prisma.seat.count({
            where: {
                deletedAt: null,
            },
        }),
        prisma_1.prisma.showtime.count({
            where: {
                deletedAt: null,
            },
        }),
        prisma_1.prisma.booking.count(),
        prisma_1.prisma.booking.count({
            where: {
                bookedAt: {
                    gte: todayStart,
                },
            },
        }),
        prisma_1.prisma.booking.count({
            where: {
                status: "cancelled",
            },
        }),
        prisma_1.prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                status: "paid",
            },
        }),
        prisma_1.prisma.payment.aggregate({
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
        prisma_1.prisma.payment.aggregate({
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
    await redis_1.redis.set(DASHBOARD_STATS_CACHE_KEY, JSON.stringify(result), "EX", DASHBOARD_STATS_CACHE_TTL);
    return result;
};
exports.getDashboardStatsService = getDashboardStatsService;
//# sourceMappingURL=admin.service.js.map