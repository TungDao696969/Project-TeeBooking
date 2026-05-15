"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUserActivityLogsService = exports.deleteActivityLogService = exports.getActivityLogByIdService = exports.getUserActivityLogsService = exports.createActivityLogService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const CACHE_TTL = 300;
const createActivityLogService = async (data) => {
    const log = await prisma_1.prisma.activityLog.create({
        data,
    });
    await redis_1.redis.del(`activity_logs:${data.userId}`);
    return log;
};
exports.createActivityLogService = createActivityLogService;
const getUserActivityLogsService = async (userId) => {
    const cacheKey = `activity_logs:${userId}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const logs = await prisma_1.prisma.activityLog.findMany({
        where: { userId },
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(logs), "EX", CACHE_TTL);
    return logs;
};
exports.getUserActivityLogsService = getUserActivityLogsService;
const getActivityLogByIdService = async (id, userId) => {
    const log = await prisma_1.prisma.activityLog.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!log) {
        throw new Error("Activity log not found");
    }
    return log;
};
exports.getActivityLogByIdService = getActivityLogByIdService;
const deleteActivityLogService = async (id, userId) => {
    const deleted = await prisma_1.prisma.activityLog.deleteMany({
        where: {
            id,
            userId,
        },
    });
    if (!deleted.count) {
        throw new Error("Activity log not found");
    }
    await redis_1.redis.del(`activity_logs:${userId}`);
};
exports.deleteActivityLogService = deleteActivityLogService;
const clearUserActivityLogsService = async (userId) => {
    await prisma_1.prisma.activityLog.deleteMany({
        where: { userId },
    });
    await redis_1.redis.del(`activity_logs:${userId}`);
};
exports.clearUserActivityLogsService = clearUserActivityLogsService;
//# sourceMappingURL=activityLog.service.js.map