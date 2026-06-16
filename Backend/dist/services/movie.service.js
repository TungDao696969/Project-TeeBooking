"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreMovieService = exports.getTrashMoviesService = exports.getMovieShowtimesService = exports.deleteMovieService = exports.updateMovieService = exports.getMovieByIdService = exports.getMoviesService = exports.createMovieService = void 0;
const client_1 = require("../generated/prisma/client");
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const CACHE_TTL = 60;
const cache_ttl = Number(process.env.CACHE_TTL) || CACHE_TTL;
const clearMovieListCache = async () => {
    const keys = await redis_1.redis.keys("movies:*");
    if (keys.length > 0) {
        await redis_1.redis.del(...keys);
    }
};
const createMovieService = async (data) => {
    const { genreIds, directors, actors, ...movieData } = data;
    const slug = (0, slug_1.generateSlug)(movieData.title);
    const movie = await prisma_1.prisma.$transaction(async (tx) => {
        const createdMovie = await tx.movie.create({
            data: {
                ...movieData,
                slug,
                releaseDate: new Date(movieData.releaseDate),
                endDate: movieData.endDate ? new Date(movieData.endDate) : null,
            },
        });
        if (genreIds) {
            const genreIdList = String(genreIds)
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean);
            if (genreIdList.length > 0) {
                await tx.movieGenre.createMany({
                    data: genreIdList.map((genreId) => ({
                        movieId: createdMovie.id,
                        genreId,
                    })),
                });
            }
        }
        if (directors) {
            const directorNames = String(directors)
                .split(",")
                .map((name) => name.trim())
                .filter(Boolean);
            for (const name of directorNames) {
                let person = await tx.person.findFirst({
                    where: { fullName: name },
                });
                if (!person) {
                    person = await tx.person.create({
                        data: { fullName: name },
                    });
                }
                await tx.movieCast.create({
                    data: {
                        movieId: createdMovie.id,
                        personId: person.id,
                        roleType: "director",
                    },
                });
            }
        }
        if (actors) {
            const actorNames = String(actors)
                .split(",")
                .map((name) => name.trim())
                .filter(Boolean);
            for (const name of actorNames) {
                let person = await tx.person.findFirst({
                    where: { fullName: name },
                });
                if (!person) {
                    person = await tx.person.create({
                        data: { fullName: name },
                    });
                }
                await tx.movieCast.create({
                    data: {
                        movieId: createdMovie.id,
                        personId: person.id,
                        roleType: "actor",
                    },
                });
            }
        }
        return createdMovie;
    });
    await clearMovieListCache();
    return movie;
};
exports.createMovieService = createMovieService;
const getMoviesService = async (page = 1, limit = 10, search) => {
    const cacheKey = `movies:${page}:${limit}:${search}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const skip = (page - 1) * limit;
    const where = {
        deletedAt: null,
        ...(search && {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: client_1.Prisma.QueryMode.insensitive,
                    },
                },
            ],
        }),
    };
    const [movies, total] = await Promise.all([
        prisma_1.prisma.movie.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                genres: {
                    include: {
                        genre: true,
                    },
                },
                casts: {
                    include: {
                        person: true,
                    },
                },
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
    return prisma_1.prisma.movie.findFirst({
        where: {
            id,
            deletedAt: null,
        },
        include: {
            genres: {
                include: {
                    genre: true,
                },
            },
            casts: {
                include: {
                    person: true,
                },
            },
        },
    });
};
exports.getMovieByIdService = getMovieByIdService;
const updateMovieService = async (id, data) => {
    const { genreIds, directors, actors, ...movieData } = data;
    if (movieData.title) {
        movieData.slug = (0, slug_1.generateSlug)(movieData.title);
    }
    if (movieData.releaseDate) {
        movieData.releaseDate = new Date(movieData.releaseDate);
    }
    if (movieData.endDate) {
        movieData.endDate = new Date(movieData.endDate);
    }
    const movie = await prisma_1.prisma.$transaction(async (tx) => {
        const updatedMovie = await tx.movie.update({
            where: { id },
            data: movieData,
        });
        if (genreIds !== undefined) {
            await tx.movieGenre.deleteMany({
                where: { movieId: id },
            });
            const genreIdList = String(genreIds)
                .split(",")
                .map((gid) => gid.trim())
                .filter(Boolean);
            if (genreIdList.length > 0) {
                await tx.movieGenre.createMany({
                    data: genreIdList.map((genreId) => ({
                        movieId: id,
                        genreId,
                    })),
                });
            }
        }
        if (directors !== undefined) {
            await tx.movieCast.deleteMany({
                where: { movieId: id, roleType: "director" },
            });
            const directorNames = String(directors)
                .split(",")
                .map((name) => name.trim())
                .filter(Boolean);
            for (const name of directorNames) {
                let person = await tx.person.findFirst({
                    where: { fullName: name },
                });
                if (!person) {
                    person = await tx.person.create({
                        data: { fullName: name },
                    });
                }
                await tx.movieCast.create({
                    data: {
                        movieId: id,
                        personId: person.id,
                        roleType: "director",
                    },
                });
            }
        }
        if (actors !== undefined) {
            await tx.movieCast.deleteMany({
                where: { movieId: id, roleType: "actor" },
            });
            const actorNames = String(actors)
                .split(",")
                .map((name) => name.trim())
                .filter(Boolean);
            for (const name of actorNames) {
                let person = await tx.person.findFirst({
                    where: { fullName: name },
                });
                if (!person) {
                    person = await tx.person.create({
                        data: { fullName: name },
                    });
                }
                await tx.movieCast.create({
                    data: {
                        movieId: id,
                        personId: person.id,
                        roleType: "actor",
                    },
                });
            }
        }
        return updatedMovie;
    });
    await clearMovieListCache();
    await redis_1.redis.del(`movie:detail:${movie.slug}`);
    await redis_1.redis.del(`movie:detail:${id}`);
    return movie;
};
exports.updateMovieService = updateMovieService;
const deleteMovieService = async (id) => {
    const movie = await prisma_1.prisma.movie.findUnique({
        where: { id },
    });
    if (!movie) {
        throw new Error("Movie not found");
    }
    if (movie.deletedAt) {
        throw new Error("Movie already deleted");
    }
    await prisma_1.prisma.movie.update({
        where: { id },
        data: {
            deletedAt: new Date(),
        },
    });
    await clearMovieListCache();
    await redis_1.redis.del(`movie:${id}`);
    const trashKeys = await redis_1.redis.keys("movies:trash*");
    if (trashKeys.length > 0) {
        await redis_1.redis.del(...trashKeys);
    }
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
    const movie = await prisma_1.prisma.movie.findFirst({
        where: {
            slug,
            deletedAt: null,
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
            deletedAt: null,
            startTime: {
                gte: new Date(),
            },
        },
        include: {
            room: {
                include: {
                    cinema: {
                        include: {
                            city: true,
                        },
                    },
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
                    city: cinema.city ? {
                        id: cinema.city.id,
                        name: cinema.city.name,
                        slug: cinema.city.slug,
                    } : null,
                },
                dates: {},
            };
        }
        const dateKey = new Date(showtime.startTime)
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
const getTrashMoviesService = async () => {
    const cacheKey = "movies:trash";
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const movies = await prisma_1.prisma.movie.findMany({
        where: {
            deletedAt: {
                not: null,
            },
        },
        include: {
            genres: true,
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(movies), "EX", CACHE_TTL);
    return movies;
};
exports.getTrashMoviesService = getTrashMoviesService;
const restoreMovieService = async (id) => {
    const movie = await prisma_1.prisma.movie.findUnique({
        where: { id },
    });
    if (!movie) {
        throw new Error("Movie not found");
    }
    if (!movie.deletedAt) {
        throw new Error("Movie is not in trash");
    }
    const restoredMovie = await prisma_1.prisma.movie.update({
        where: { id },
        data: {
            deletedAt: null,
        },
    });
    await clearMovieListCache();
    await redis_1.redis.del("movies:trash");
    await redis_1.redis.del(`movie:${id}`);
    return restoredMovie;
};
exports.restoreMovieService = restoreMovieService;
//# sourceMappingURL=movie.service.js.map