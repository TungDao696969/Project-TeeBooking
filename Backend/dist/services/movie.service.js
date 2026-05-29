"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieShowtimesService = exports.deleteMovieService = exports.updateMovieService = exports.getMoviesService = exports.createMovieService = void 0;
const client_1 = require("../generated/prisma/client");
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const cache_ttl = Number(process.env.CACHE_TTL);
const CACHE_TTL = 60;
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
// export const getMovieByIdService = async (slug: string) => {
//   return prisma.movie.findUnique({
//     where: { slug },
//     include: {
//       genres: true,
//       casts: true,
//       showtimes: true,
//       reviews: true,
//     },
//   });
// };
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
const getMovieShowtimesService = async (slug) => {
    const cacheKey = `movie:${slug}:showtimes`;
    // cache
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    // find movie
    const movie = await prisma_1.prisma.movie.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            title: true,
            slug: true,
        },
    });
    if (!movie) {
        throw new Error("Movie not found");
    }
    // get showtimes
    const showtimes = await prisma_1.prisma.showtime.findMany({
        where: {
            movieId: movie.id,
            isActive: true,
            startTime: {
                gte: new Date(),
            },
        },
        include: {
            room: {
                include: {
                    cinema: true,
                },
            },
        },
        orderBy: [
            {
                showDate: "asc",
            },
            {
                startTime: "asc",
            },
        ],
    });
    // group by cinema + date
    const cinemaMap = {};
    for (const showtime of showtimes) {
        const cinema = showtime.room.cinema;
        const cinemaId = cinema.id;
        if (!cinemaMap[cinemaId]) {
            cinemaMap[cinemaId] = {
                cinema: {
                    id: cinema.id,
                    name: cinema.name,
                    slug: cinema.slug,
                    address: cinema.address,
                    province: cinema.province,
                },
                dates: {},
            };
        }
        const dateKey = new Date(showtime.showDate)
            .toISOString()
            .split("T")[0];
        if (!cinemaMap[cinemaId].dates[dateKey]) {
            cinemaMap[cinemaId].dates[dateKey] = {
                date: dateKey,
                showtimes: [],
            };
        }
        cinemaMap[cinemaId].dates[dateKey].showtimes.push({
            id: showtime.id,
            startTime: showtime.startTime,
            endTime: showtime.endTime,
            format: showtime.format,
            language: showtime.language,
            subtitle: showtime.subtitle,
            basePrice: showtime.basePrice,
            room: {
                id: showtime.room.id,
                name: showtime.room.roomName,
            },
        });
    }
    // transform
    const result = Object.values(cinemaMap).map((item) => ({
        cinema: item.cinema,
        dates: Object.values(item.dates),
    }));
    // cache redis
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);
    return result;
};
exports.getMovieShowtimesService = getMovieShowtimesService;
//# sourceMappingURL=movie.service.js.map