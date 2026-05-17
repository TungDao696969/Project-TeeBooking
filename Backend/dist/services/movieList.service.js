"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesListService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const getMoviesListService = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(query.limit) || 12, 1), 50);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const genre = query.genre;
    const status = query.status;
    const sortBy = query.sortBy || "releaseDate";
    const order = query.order || "desc";
    const cacheKey = `movies:list:${JSON.stringify(query)}`;
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    //   const whereClause: any = {
    //     AND: [
    //       search
    //         ? {
    //             OR: [
    //               { title: { contains: search, mode: "insensitive" } },
    //               { originalTitle: { contains: search, mode: "insensitive" } },
    //               { description: { contains: search, mode: "insensitive" } },
    //             ],
    //           }
    //         : {},
    //       status ? { status } : {},
    //       genre ? { genres: { some: { genre: { slug: genre } } } } : {},
    //     ],
    //   };
    const conditions = [];
    if (search) {
        conditions.push({
            OR: [
                { title: { contains: search, mode: "insensitive" } },
                { originalTitle: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ],
        });
    }
    if (status) {
        conditions.push({ status });
    }
    if (genre) {
        conditions.push({
            genres: {
                some: {
                    genre: {
                        slug: genre,
                    },
                },
            },
        });
    }
    const whereClause = conditions.length > 0 ? { AND: conditions } : {};
    const [movies, total] = await Promise.all([
        prisma_1.prisma.movie.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [sortBy]: order },
            include: {
                genres: { include: { genre: true } },
                reviews: { select: { rating: true } },
            },
        }),
        prisma_1.prisma.movie.count({ where: whereClause }),
    ]);
    const formattedMovies = movies.map((movie) => {
        const averageRating = movie.reviews.length > 0
            ? movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length
            : 0;
        return {
            id: movie.id,
            title: movie.title,
            slug: movie.slug,
            originalTitle: movie.originalTitle,
            description: movie.description,
            durationMinutes: movie.durationMinutes,
            releaseDate: movie.releaseDate,
            ageRating: movie.ageRating,
            language: movie.language,
            subtitle: movie.subtitle,
            trailerUrl: movie.trailerUrl,
            posterUrl: movie.posterUrl,
            bannerUrl: movie.bannerUrl,
            status: movie.status,
            country: movie.country,
            producer: movie.producer,
            genres: movie.genres.map((g) => g.genre.name),
            averageRating: Number(averageRating.toFixed(1)),
        };
    });
    const result = {
        success: true,
        data: formattedMovies,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", 300);
    return result;
};
exports.getMoviesListService = getMoviesListService;
//# sourceMappingURL=movieList.service.js.map