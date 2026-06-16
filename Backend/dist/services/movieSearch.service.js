"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieSuggestionsService = exports.searchMoviesService = void 0;
const redis_1 = require("../utils/redis");
const prisma_1 = require("../utils/prisma");
const generateCacheKey = (params) => {
    return `movies:list:${JSON.stringify(params)}`;
};
const searchMoviesService = async (params) => {
    const cacheKey = generateCacheKey(params);
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const { q, genre, status, minRating, year, sort = "latest" } = params;
    const pageNumber = Number(params.page || 1);
    const limitNumber = Number(params.limit || 10);
    const skip = (pageNumber - 1) * limitNumber;
    const where = { deletedAt: null };
    if (q) {
        where.OR = [
            {
                title: {
                    contains: q,
                    mode: "insensitive",
                },
            },
            {
                originalTitle: {
                    contains: q,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (status) {
        where.status = status;
    }
    if (year) {
        where.releaseDate = {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
        };
    }
    if (genre) {
        where.genres = {
            some: {
                genre: {
                    slug: genre,
                },
            },
        };
    }
    const orderByMap = {
        latest: {
            releaseDate: "desc",
        },
        oldest: {
            releaseDate: "asc",
        },
        title_asc: {
            title: "asc",
        },
        title_desc: {
            title: "desc",
        },
    };
    const [movies, total] = await Promise.all([
        prisma_1.prisma.movie.findMany({
            where,
            skip,
            take: limitNumber,
            orderBy: orderByMap[sort] || {
                releaseDate: "desc",
            },
            include: {
                genres: {
                    include: {
                        genre: true,
                    },
                },
                reviews: true,
                trailers: true,
            },
        }),
        prisma_1.prisma.movie.count({ where }),
    ]);
    let filteredMovies = movies;
    if (minRating) {
        filteredMovies = movies.filter((movie) => {
            const avg = movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
                (movie.reviews.length || 1);
            return avg >= minRating;
        });
    }
    if (sort === "rating_desc") {
        filteredMovies.sort((a, b) => {
            const avgA = a.reviews.reduce((sum, r) => sum + r.rating, 0) /
                (a.reviews.length || 1);
            const avgB = b.reviews.reduce((sum, r) => sum + r.rating, 0) /
                (b.reviews.length || 1);
            return avgB - avgA;
        });
    }
    if (sort === "rating_asc") {
        filteredMovies.sort((a, b) => {
            const avgA = a.reviews.reduce((sum, r) => sum + r.rating, 0) /
                (a.reviews.length || 1);
            const avgB = b.reviews.reduce((sum, r) => sum + r.rating, 0) /
                (b.reviews.length || 1);
            return avgA - avgB;
        });
    }
    const result = {
        success: true,
        data: filteredMovies.map((movie) => ({
            ...movie,
            averageRating: Number((movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
                (movie.reviews.length || 1)).toFixed(1)),
        })),
        pagination: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(total / limitNumber),
        },
    };
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", 60 * 30);
    return result;
};
exports.searchMoviesService = searchMoviesService;
const getMovieSuggestionsService = async (q) => {
    if (!q.trim()) {
        return [];
    }
    const movies = await prisma_1.prisma.movie.findMany({
        where: {
            deletedAt: null,
            OR: [
                {
                    title: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
                {
                    originalTitle: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
            ],
        },
        select: {
            id: true,
            title: true,
            posterUrl: true,
            slug: true,
        },
        take: 8,
    });
    return movies;
};
exports.getMovieSuggestionsService = getMovieSuggestionsService;
//# sourceMappingURL=movieSearch.service.js.map