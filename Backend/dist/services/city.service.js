"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.getCityByIdService = exports.getCitiesService = exports.createCityService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const CITY_CACHE_KEY = "cities:list";
const clearCityCache = async () => {
    await redis_1.redis.del("cities:list");
};
const createCityService = async (data) => {
    const existing = await prisma_1.prisma.city.findUnique({
        where: {
            slug: data.slug,
        },
    });
    if (existing) {
        throw new Error("City already exists");
    }
    const city = await prisma_1.prisma.city.create({
        data,
    });
    await clearCityCache();
    return {
        success: true,
        message: "City created successfully",
        data: city,
    };
};
exports.createCityService = createCityService;
const getCitiesService = async () => {
    const cached = await redis_1.redis.get(CITY_CACHE_KEY);
    if (cached) {
        return JSON.parse(cached);
    }
    const cities = await prisma_1.prisma.city.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    const result = {
        success: true,
        data: cities,
    };
    await redis_1.redis.set(CITY_CACHE_KEY, JSON.stringify(result), "EX", 60 * 60);
    return result;
};
exports.getCitiesService = getCitiesService;
const getCityByIdService = async (id) => {
    const city = await prisma_1.prisma.city.findUnique({
        where: { id },
    });
    if (!city) {
        throw new Error("City not found");
    }
    return {
        success: true,
        data: city,
    };
};
exports.getCityByIdService = getCityByIdService;
const updateCityService = async (id, data) => {
    const existing = await prisma_1.prisma.city.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("City not found");
    }
    const city = await prisma_1.prisma.city.update({
        where: { id },
        data,
    });
    await clearCityCache();
    return {
        success: true,
        message: "City updated successfully",
        data: city,
    };
};
exports.updateCityService = updateCityService;
const deleteCityService = async (id) => {
    const existing = await prisma_1.prisma.city.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("City not found");
    }
    await prisma_1.prisma.city.delete({
        where: { id },
    });
    await clearCityCache();
    return {
        success: true,
        message: "City deleted successfully",
    };
};
exports.deleteCityService = deleteCityService;
//# sourceMappingURL=city.service.js.map