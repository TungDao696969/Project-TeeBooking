"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovieService = exports.updateMovieService = exports.getMovieByIdService = exports.getMoviesService = exports.createMovieService = void 0;
const client_1 = require("../generated/prisma/client");
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const cache_ttl = Number(process.env.CACHE_TTL);
const createMovieService = async (data) => {
    const slug = (0, slug_1.generateSlug)(data.title);
    const movie = await prisma_1.prisma.movie.create({
        data: {
            ...data,
            slug,
            releaseDate: new Date(data.releaseDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
        },
    });
    await redis_1.redis.del("movies:list");
    return movie;
};
exports.createMovieService = createMovieService;
const getMoviesService = async (page = 1, limit = 10, search) => {
    const cacheKey = `movies:${page}:${limit}:${search}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const skip = (page - 1) * limit;
    const where = search
        ? {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: client_1.Prisma.QueryMode.insensitive,
                    },
                },
            ],
        }
        : {};
    const [movies, total] = await Promise.all([
        prisma_1.prisma.movie.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                genres: true,
            },
        }),
        prisma_1.prisma.movie.count({ where }),
    ]);
    const result = {
        data: movies,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);
    return result;
};
exports.getMoviesService = getMoviesService;
const getMovieByIdService = async (id) => {
    return prisma_1.prisma.movie.findUnique({
        where: { id },
        include: {
            genres: true,
            casts: true,
            showtimes: true,
            reviews: true,
        },
    });
};
exports.getMovieByIdService = getMovieByIdService;
const updateMovieService = async (id, data) => {
    if (data.title) {
        data.slug = (0, slug_1.generateSlug)(data.title);
    }
    const movie = await prisma_1.prisma.movie.update({
        where: { id },
        data,
    });
    await redis_1.redis.flushall();
    return movie;
};
exports.updateMovieService = updateMovieService;
const deleteMovieService = async (id) => {
    await prisma_1.prisma.movie.delete({
        where: { id },
    });
    await redis_1.redis.flushall();
    return true;
};
exports.deleteMovieService = deleteMovieService;
//# sourceMappingURL=movie.service.js.map