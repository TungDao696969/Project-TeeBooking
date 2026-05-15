"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCinemaService = exports.updateCinemaService = exports.getCinemaByIdService = exports.getCinemaService = exports.createCinemaService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const cache_ttl = Number(process.env.CACHE_TTL);
const createCinemaService = async (data) => {
    const slug = (0, slug_1.generateSlug)(data.name);
    const cinema = await prisma_1.prisma.cinema.create({
        data: {
            ...data,
            slug,
        },
    });
    await redis_1.redis.del("cinemas:all");
    return cinema;
};
exports.createCinemaService = createCinemaService;
const getCinemaService = async () => {
    const cached = await redis_1.redis.get("cinemas:all");
    if (cached) {
        return JSON.parse(cached);
    }
    const cinema = await prisma_1.prisma.cinema.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set("cinemas:all", JSON.stringify(cinema), "EX", cache_ttl);
    return cinema;
};
exports.getCinemaService = getCinemaService;
const getCinemaByIdService = async (id) => {
    const cacheKey = `cinema: ${id}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const cinema = await prisma_1.prisma.cinema.findUnique({
        where: { id },
        include: { rooms: true },
    });
    if (!cinema)
        throw new Error("Cinema not found");
    await redis_1.redis.set(cacheKey, JSON.stringify(cinema), "EX", cache_ttl);
    return cinema;
};
exports.getCinemaByIdService = getCinemaByIdService;
const updateCinemaService = async (id, data) => {
    const updatedData = { ...data };
    if (data.name) {
        updatedData.slug = (0, slug_1.generateSlug)(data.name);
    }
    const cinema = await prisma_1.prisma.cinema.update({
        where: { id },
        data: updatedData,
    });
    await redis_1.redis.del(`cinema:${id}`);
    await redis_1.redis.del("cinemas:all");
    return cinema;
};
exports.updateCinemaService = updateCinemaService;
const deleteCinemaService = async (id) => {
    await prisma_1.prisma.cinema.delete({
        where: { id },
    });
    await redis_1.redis.del(`cinema:${id}`);
    await redis_1.redis.del("cinemas:all");
    return true;
};
exports.deleteCinemaService = deleteCinemaService;
//# sourceMappingURL=cinema.service.js.map