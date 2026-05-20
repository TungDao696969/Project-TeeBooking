"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivePromotionService = exports.deletePromotionService = exports.updatePromotionService = exports.getPromotionByIdService = exports.getAllPromotionService = exports.createPromotionService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const CACHE_PREFIX = "promotions";
const CACHE_TTL = Number(process.env.CACHE_TTL || 60);
const createPromotionService = async (data) => {
    const promotion = await prisma_1.prisma.promotion.create({
        data,
    });
    await clearPromotionCache();
    return promotion;
};
exports.createPromotionService = createPromotionService;
const getAllPromotionService = async (page = 1, limit = 10) => {
    const cacheKey = `${CACHE_PREFIX}:${page}:${limit}`;
    const cache = await redis_1.redis.get(cacheKey);
    if (cache) {
        return JSON.parse(cache);
    }
    const skip = (page - 1) * limit;
    const [promotions, total] = await Promise.all([
        prisma_1.prisma.promotion.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.promotion.count(),
    ]);
    const result = {
        data: promotions,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);
    return result;
};
exports.getAllPromotionService = getAllPromotionService;
const getPromotionByIdService = async (id) => {
    return prisma_1.prisma.promotion.findUnique({
        where: {
            id,
        },
    });
};
exports.getPromotionByIdService = getPromotionByIdService;
const updatePromotionService = async (id, data) => {
    const promotion = await prisma_1.prisma.promotion.update({
        where: {
            id,
        },
        data,
    });
    await clearPromotionCache();
    return promotion;
};
exports.updatePromotionService = updatePromotionService;
const deletePromotionService = async (id) => {
    await prisma_1.prisma.promotion.delete({
        where: {
            id,
        },
    });
    await clearPromotionCache();
};
exports.deletePromotionService = deletePromotionService;
const getActivePromotionService = async () => {
    return prisma_1.prisma.promotion.findMany({
        where: {
            isActive: true,
            startDate: {
                lte: new Date(),
            },
            endDate: {
                gte: new Date(),
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getActivePromotionService = getActivePromotionService;
async function clearPromotionCache() {
    const keys = await redis_1.redis.keys(`${CACHE_PREFIX}*`);
    if (keys.length > 0) {
        await redis_1.redis.del(keys);
    }
}
//# sourceMappingURL=promotion.service.js.map