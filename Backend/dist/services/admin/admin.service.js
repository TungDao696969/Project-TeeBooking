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
    const totalUsers = await prisma_1.prisma.user.count();
    const totalBookings = await prisma_1.prisma.booking.count();
    const totalRevenue = await prisma_1.prisma.payment.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            status: "paid",
        },
    });
    const todayBookings = await prisma_1.prisma.booking.count({
        where: {
            bookedAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
        },
    });
    const cancelledBookings = await prisma_1.prisma.booking.count({
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
    await redis_1.redis.set(DASHBOARD_STATS_CACHE_KEY, JSON.stringify(stats), "EX", DASHBOARD_STATS_CACHE_TTL);
    return stats;
};
exports.getDashboardStatsService = getDashboardStatsService;
//# sourceMappingURL=admin.service.js.map