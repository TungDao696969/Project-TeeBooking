"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBannerService = exports.updateBannerService = exports.getBannerById = exports.getAllBannersAdminService = exports.getAllBannerService = exports.createBannerService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const createBannerService = async (data) => {
    const banner = await prisma_1.prisma.banner.create({
        data: {
            title: data.title,
            imageUrl: data.imageUrl,
            redirectUrl: data.redirectUrl,
            startDate: data.startDate,
            endDate: data.endDate,
            isActive: data.isActive ?? true,
        },
    });
    await redis_1.redis.del("banners:list");
    return banner;
};
exports.createBannerService = createBannerService;
const getAllBannerService = async () => {
    const cacheKey = "banners:list";
    const cache = await redis_1.redis.get(cacheKey);
    if (cache) {
        return JSON.parse(cache);
    }
    const banner = await prisma_1.prisma.banner.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(banner), "EX", cache_ttl);
    return banner;
};
exports.getAllBannerService = getAllBannerService;
const getAllBannersAdminService = async () => {
    const banners = await prisma_1.prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return banners;
};
exports.getAllBannersAdminService = getAllBannersAdminService;
const getBannerById = async (id) => {
    const banner = await prisma_1.prisma.banner.findUnique({
        where: {
            id,
        },
    });
    return banner;
};
exports.getBannerById = getBannerById;
const updateBannerService = async (id, data) => {
    const banner = await prisma_1.prisma.banner.update({
        where: {
            id,
        },
        data: data,
    });
    await redis_1.redis.del("banners:list");
    return banner;
};
exports.updateBannerService = updateBannerService;
const deleteBannerService = async (id) => {
    await prisma_1.prisma.banner.delete({
        where: {
            id,
        },
    });
    await redis_1.redis.del("banners:list");
};
exports.deleteBannerService = deleteBannerService;
//# sourceMappingURL=banner.service.js.map