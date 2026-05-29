"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCinemaShowtimesService = exports.deleteCinemaService = exports.updateCinemaService = exports.getCinemaBySlugService = exports.getCinemaService = exports.createCinemaService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const dayjs_1 = __importDefault(require("dayjs"));
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
//# sourceMappingURL=cinema.service.js.map