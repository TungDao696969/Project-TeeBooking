"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsReadService = exports.deleteNotificationService = exports.updateNotificationService = exports.getNotificationByIdService = exports.getAllNotificationService = exports.createNotificationService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cacheTtl = Number(process.env.CACHE_TTL);
const createNotificationService = async (userId, data) => {
    const notification = await prisma_1.prisma.notification.create({
        data: {
            userId,
            ...data,
        },
    });
    await redis_1.redis.del(`notification: ${userId}`);
    return notification;
};
exports.createNotificationService = createNotificationService;
const getAllNotificationService = async (userId) => {
    const cacheKey = `notification:${cacheTtl}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const notification = await prisma_1.prisma.notification.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(notification), "EX", cacheTtl);
    return notification;
};
exports.getAllNotificationService = getAllNotificationService;
const getNotificationByIdService = async (userId, id) => {
    const notification = await prisma_1.prisma.notification.findFirst({
        where: {
            id,
            userId,
        },
    });
    return notification;
};
exports.getNotificationByIdService = getNotificationByIdService;
const updateNotificationService = async (userId, id, data) => {
    const notification = await prisma_1.prisma.notification.update({
        where: { id },
        data,
    });
    await redis_1.redis.del(`notifications:${userId}`);
    return notification;
};
exports.updateNotificationService = updateNotificationService;
const deleteNotificationService = async (userId, id) => {
    await prisma_1.prisma.notification.delete({
        where: { id },
    });
    await redis_1.redis.del(`notifications:${userId}`);
    return true;
};
exports.deleteNotificationService = deleteNotificationService;
const markAsReadService = async (userId, id) => {
    const notification = await prisma_1.prisma.notification.update({
        where: { id },
        data: {
            isRead: true,
        },
    });
    await redis_1.redis.del(`notifications:${userId}`);
    return notification;
};
exports.markAsReadService = markAsReadService;
//# sourceMappingURL=notification.service.js.map