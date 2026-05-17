"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrailerService = exports.updateTrailerService = exports.getTrailerByIdService = exports.getTrailerByMovieService = exports.createTrailerService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const getTrailerCacheKey = (movieId) => `trailers:${movieId}`;
const getMovieDetailCacheKey = (movieId) => `movie:detail:${movieId}`;
const clearTrailerCache = async (movieId) => {
    await redis_1.redis.del(getTrailerCacheKey(movieId));
};
const clearMovieDetailCache = async (movieId) => {
    await redis_1.redis.del(getMovieDetailCacheKey(movieId));
};
const clearRelatedCache = async (movieId) => {
    await Promise.all([
        clearTrailerCache(movieId),
        clearMovieDetailCache(movieId),
    ]);
};
const createTrailerService = async (payload) => {
    const movie = await prisma_1.prisma.movie.findUnique({
        where: {
            id: payload.movieId,
        },
    });
    if (!movie) {
        throw new Error("Movie not found");
    }
    const trailer = await prisma_1.prisma.trailer.create({
        data: {
            ...payload,
        },
    });
    await clearRelatedCache(payload.movieId);
    return {
        success: true,
        message: "Trailer created successfully",
        data: trailer,
    };
};
exports.createTrailerService = createTrailerService;
const getTrailerByMovieService = async (movieId) => {
    const cacheKey = getTrailerCacheKey(movieId);
    const cachedTrailers = await redis_1.redis.get(cacheKey);
    if (cachedTrailers) {
        return JSON.parse(cachedTrailers);
    }
    const trailers = await prisma_1.prisma.trailer.findMany({
        where: {
            movieId,
            isActive: true,
        },
        orderBy: [
            {
                sortOrder: "asc",
            },
            {
                createdAt: "desc",
            },
        ],
    });
    const result = {
        success: true,
        data: trailers,
    };
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);
    return result;
};
exports.getTrailerByMovieService = getTrailerByMovieService;
const getTrailerByIdService = async (id) => {
    const trailer = await prisma_1.prisma.trailer.findUnique({
        where: { id },
    });
    if (!trailer) {
        throw new Error("Trailer not found");
    }
    return {
        success: true,
        data: trailer,
    };
};
exports.getTrailerByIdService = getTrailerByIdService;
const updateTrailerService = async (id, payload) => {
    const existingTrailer = await prisma_1.prisma.trailer.findUnique({
        where: { id },
    });
    if (!existingTrailer) {
        throw new Error("Trailer not found");
    }
    const updatedTrailer = await prisma_1.prisma.trailer.update({
        where: { id },
        data: payload,
    });
    await clearRelatedCache(existingTrailer.movieId);
    return {
        success: true,
        message: "Trailer updated successfully",
        data: updatedTrailer,
    };
};
exports.updateTrailerService = updateTrailerService;
const deleteTrailerService = async (id) => {
    const existingTrailer = await prisma_1.prisma.trailer.findUnique({
        where: { id },
    });
    if (!existingTrailer) {
        throw new Error("Trailer not found");
    }
    await prisma_1.prisma.trailer.delete({
        where: { id },
    });
    await clearRelatedCache(existingTrailer.movieId);
    return {
        success: true,
        message: "Trailer deleted successfully",
    };
};
exports.deleteTrailerService = deleteTrailerService;
//# sourceMappingURL=trailer.service.js.map