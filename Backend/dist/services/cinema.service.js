"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCinemaService = exports.getTrashCinemasService = exports.getCinemaShowtimesService = exports.deleteCinemaService = exports.updateCinemaService = exports.getCinemaByIdService = exports.getCinemaBySlugService = exports.getCinemaService = exports.createCinemaService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const dayjs_1 = __importDefault(require("dayjs"));
const cache_ttl = Number(process.env.CACHE_TTL);
const clearCinemaListCache = async () => {
    const keys = await redis_1.redis.keys("cinemas:*");
    if (keys.length > 0) {
        await redis_1.redis.del(...keys);
    }
};
const createCinemaService = async (data) => {
    const slug = (0, slug_1.generateSlug)(data.name);
    const cinema = await prisma_1.prisma.cinema.create({
        data: {
            ...data,
            slug,
        },
    });
    await clearCinemaListCache();
    return cinema;
};
exports.createCinemaService = createCinemaService;
const getCinemaService = async (page = 1, limit = 10) => {
    const cacheKey = `cinemas:${page}:${limit}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const skip = (page - 1) * limit;
    const [cinemas, total] = await Promise.all([
        prisma_1.prisma.cinema.findMany({
            where: {
                deletedAt: null,
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.cinema.count({
            where: {
                deletedAt: null,
            },
        }),
    ]);
    const result = {
        data: cinemas,
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
exports.getCinemaService = getCinemaService;
const getCinemaBySlugService = async (slug) => {
    const cacheKey = `cinema: ${slug}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const cinema = await prisma_1.prisma.cinema.findUnique({
        where: { slug },
        include: { rooms: true },
    });
    if (!cinema)
        throw new Error("Cinema not found");
    await redis_1.redis.set(cacheKey, JSON.stringify(cinema), "EX", cache_ttl);
    return cinema;
};
exports.getCinemaBySlugService = getCinemaBySlugService;
const getCinemaByIdService = async (id) => {
    const cinema = await prisma_1.prisma.cinema.findFirst({
        where: {
            id,
            deletedAt: null,
        },
    });
    if (!cinema) {
        throw new Error("Cinema not found");
    }
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
    await clearCinemaListCache();
    return cinema;
};
exports.updateCinemaService = updateCinemaService;
const deleteCinemaService = async (id) => {
    const cinema = await prisma_1.prisma.cinema.findUnique({
        where: { id },
    });
    if (!cinema) {
        throw new Error("Cinema not found");
    }
    if (cinema.deletedAt) {
        throw new Error("Cinema already deleted");
    }
    await prisma_1.prisma.cinema.update({
        where: { id },
        data: {
            deletedAt: new Date(),
        },
    });
    await clearCinemaListCache();
    await redis_1.redis.del(`cinema:${id}`);
    return true;
};
exports.deleteCinemaService = deleteCinemaService;
const getCinemaShowtimesService = async (slug) => {
    const cacheKey = `cinema-showtimes:${slug}`;
    // BYPASS CACHE FOR DEBUG
    // const cached = await redis.get(cacheKey);
    // if (cached) {
    //   console.log(`✅ Cache hit: ${cacheKey}`, JSON.parse(cached).length);
    //   return JSON.parse(cached);
    // }
    console.log(`🔍 Fetching showtimes for cinema: ${slug}`);
    const showtimes = await prisma_1.prisma.showtime.findMany({
        where: {
            isActive: true,
            room: {
                cinema: {
                    slug,
                    deletedAt: null,
                },
            },
            movie: {
                status: "now_showing",
            },
        },
        include: {
            movie: {
                include: {
                    genres: {
                        include: {
                            genre: true,
                        },
                    },
                },
            },
            room: true,
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
    console.log(`📍 Cinema slug: ${slug}`);
    console.log(`🎬 Found showtimes: ${showtimes.length}`);
    // Debug: Check tất cả showtimes
    const allShowtimesCount = await prisma_1.prisma.showtime.count();
    console.log(`📊 Total showtimes in DB: ${allShowtimesCount}`);
    // Debug: Check showtimes với isActive = true
    const activeCount = await prisma_1.prisma.showtime.count({
        where: { isActive: true },
    });
    console.log(`✅ Active showtimes: ${activeCount}`);
    // DEBUG: Lấy tất cả active showtimes xem chi tiết
    const allActiveShowtimes = await prisma_1.prisma.showtime.findMany({
        where: { isActive: true },
        include: {
            room: {
                include: {
                    cinema: true,
                },
            },
            movie: true,
        },
    });
    console.log(`\n📋 ALL ACTIVE SHOWTIMES IN DB:`);
    allActiveShowtimes.forEach((st, idx) => {
        console.log(`  [${idx}] Showtime ID: ${st.id}`);
        console.log(`      Room: ${st.room?.roomName}, Cinema: ${st.room?.cinema?.name} (slug: ${st.room?.cinema?.slug})`);
        console.log(`      Movie: ${st.movie?.title} (status: ${st.movie?.status})`);
        console.log(`      ShowDate: ${st.showDate}, StartTime: ${st.startTime}`);
    });
    console.log(`\n`);
    // Debug: Check cinema
    const cinema = await prisma_1.prisma.cinema.findUnique({
        where: { slug },
        include: { rooms: true },
    });
    console.log(`🏢 Cinema found: ${cinema?.name || "NOT FOUND"}, rooms: ${cinema?.rooms.length || 0}`);
    // Debug: Check movies with status now_showing
    const nowShowingMovies = await prisma_1.prisma.movie.count({
        where: { status: "now_showing" },
    });
    console.log(`🎥 Now showing movies: ${nowShowingMovies}`);
    // GROUP DATA
    const groupedMovies = new Map();
    for (const showtime of showtimes) {
        const movieId = showtime.movie.id;
        if (!groupedMovies.has(movieId)) {
            groupedMovies.set(movieId, {
                movie: {
                    id: showtime.movie.id,
                    title: showtime.movie.title,
                    slug: showtime.movie.slug,
                    posterUrl: showtime.movie.posterUrl,
                    durationMinutes: showtime.movie.durationMinutes,
                    ageRating: showtime.movie.ageRating,
                    status: showtime.movie.status,
                    country: showtime.movie.country,
                    genres: showtime.movie.genres.map((g) => g.genre.name),
                },
                dates: [],
            });
        }
        const movieGroup = groupedMovies.get(movieId);
        const dateKey = (0, dayjs_1.default)(showtime.showDate).format("YYYY-MM-DD");
        let dateGroup = movieGroup.dates.find((d) => d.date === dateKey);
        if (!dateGroup) {
            dateGroup = {
                date: dateKey,
                formats: [],
            };
            movieGroup.dates.push(dateGroup);
        }
        const formatKey = showtime.format || "STANDARD";
        let formatGroup = dateGroup.formats.find((f) => f.type === formatKey);
        if (!formatGroup) {
            formatGroup = {
                type: formatKey,
                showtimes: [],
            };
            dateGroup.formats.push(formatGroup);
        }
        formatGroup.showtimes.push({
            id: showtime.id,
            time: (0, dayjs_1.default)(showtime.startTime).format("HH:mm"),
            endTime: (0, dayjs_1.default)(showtime.endTime).format("HH:mm"),
            roomName: showtime.room.roomName,
            basePrice: showtime.basePrice,
        });
    }
    const result = Array.from(groupedMovies.values());
    console.log(`📊 Result: ${result.length} movies with showtimes`);
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);
    return result;
};
exports.getCinemaShowtimesService = getCinemaShowtimesService;
const getTrashCinemasService = async () => {
    const cacheKey = "cinemas:trash";
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const cinemas = await prisma_1.prisma.cinema.findMany({
        where: {
            deletedAt: {
                not: null,
            },
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(cinemas), "EX", cache_ttl);
    return cinemas;
};
exports.getTrashCinemasService = getTrashCinemasService;
const restoreCinemaService = async (id) => {
    const cinema = await prisma_1.prisma.cinema.findUnique({
        where: { id },
    });
    if (!cinema) {
        throw new Error("Cinema not found");
    }
    if (!cinema.deletedAt) {
        throw new Error("Cinema is not in trash");
    }
    const restoredCinema = await prisma_1.prisma.cinema.update({
        where: { id },
        data: {
            deletedAt: null,
        },
    });
    await clearCinemaListCache();
    await redis_1.redis.del(`cinema:${id}`);
    return restoredCinema;
};
exports.restoreCinemaService = restoreCinemaService;
//# sourceMappingURL=cinema.service.js.map