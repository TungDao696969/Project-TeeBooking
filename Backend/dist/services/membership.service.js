"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMembershipService = exports.updateMembershipService = exports.createMembershipService = exports.getMembershipService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const getMembershipService = async (userId) => {
    const cacheTtl = Number(process.env.CACHE_TTL) || 600;
    const cacheKey = `membership:${userId}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const membership = await prisma_1.prisma.membership.findFirst({
        where: {
            userId,
        },
        orderBy: {
            joinedAt: "desc",
        },
    });
    if (!membership) {
        throw new Error("Membership not found");
    }
    await redis_1.redis.set(cacheKey, JSON.stringify(membership), "EX", cacheTtl);
    return membership;
};
exports.getMembershipService = getMembershipService;
const createMembershipService = async (userId) => {
    const existing = await prisma_1.prisma.membership.findFirst({
        where: { userId },
    });
    if (existing) {
        throw new Error("Membership already exists");
    }
    const membershipCode = `MEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return prisma_1.prisma.membership.create({
        data: {
            userId,
            membershipCode,
            level: "BRONZE",
            points: 0,
            lifetimePoints: 0,
            joinedAt: new Date(),
            expiredAt: null,
        },
    });
};
exports.createMembershipService = createMembershipService;
const updateMembershipService = async (userId, data) => {
    const existing = await prisma_1.prisma.membership.findFirst({
        where: { userId },
        orderBy: {
            joinedAt: "desc",
        },
    });
    if (!existing) {
        throw new Error("Membership not found");
    }
    const membership = await prisma_1.prisma.membership.update({
        where: { id: existing.id },
        data,
    });
    await redis_1.redis.del(`membership:${userId}`);
    return membership;
};
exports.updateMembershipService = updateMembershipService;
const deleteMembershipService = async (userId) => {
    const existing = await prisma_1.prisma.membership.findFirst({
        where: { userId },
        orderBy: {
            joinedAt: "desc",
        },
    });
    if (!existing) {
        throw new Error("Membership not found");
    }
    await prisma_1.prisma.membership.delete({
        where: { id: existing.id },
    });
    await redis_1.redis.del(`membership:${userId}`);
};
exports.deleteMembershipService = deleteMembershipService;
//# sourceMappingURL=membership.service.js.map