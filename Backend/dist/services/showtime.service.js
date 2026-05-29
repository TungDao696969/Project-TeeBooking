"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowtimeTicketTypesService = exports.deleteShowtimeService = exports.updateShowtimeService = exports.getShowtimeByIdService = exports.getAllShowtimesService = exports.createShowtimeService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const createShowtimeService = async (data) => {
    const movie = await prisma_1.prisma.movie.findUnique({
        where: { id: data.movieId },
    });
    if (!movie) {
        throw new Error("Movie not found");
    }
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id: data.roomId },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    const showTime = await prisma_1.prisma.showtime.create({
        data: {
            ...data,
            showDate: new Date(data.showDate),
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
        },
        include: {
            movie: true,
            room: true,
        },
    });
    await redis_1.redis.del(`showtimes:${data.roomId}`);
    return showTime;
};
exports.createShowtimeService = createShowtimeService;
const getAllShowtimesService = async () => {
    const cacheKey = "showtimes:all";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const showtimes = await prisma_1.prisma.showtime.findMany({
        include: {
            movie: true,
            room: true,
            seats: true,
            bookings: true,
        },
        orderBy: {
            startTime: "asc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(showtimes), "EX", cache_ttl);
    return showtimes;
};
exports.getAllShowtimesService = getAllShowtimesService;
const getShowtimeByIdService = async (id) => {
    return prisma_1.prisma.showtime.findUnique({
        where: { id },
        include: {
            movie: true,
            room: true,
            seats: true,
            bookings: true,
        },
    });
};
exports.getShowtimeByIdService = getShowtimeByIdService;
const updateShowtimeService = async (id, data) => {
    const existing = await prisma_1.prisma.showtime.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Showtime not found");
    }
    const updated = await prisma_1.prisma.showtime.update({
        where: { id },
        data: {
            ...data,
            showDate: data.showDate ? new Date(data.showDate) : undefined,
            startTime: data.startTime ? new Date(data.startTime) : undefined,
            endTime: data.endTime ? new Date(data.endTime) : undefined,
        },
        include: {
            movie: true,
            room: true,
        },
    });
    await redis_1.redis.del("showtimes:all");
    await redis_1.redis.del(`showtimes:${existing.roomId}`);
    return updated;
};
exports.updateShowtimeService = updateShowtimeService;
const deleteShowtimeService = async (id) => {
    const existing = await prisma_1.prisma.showtime.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Showtime not found");
    }
    await prisma_1.prisma.showtime.delete({
        where: { id },
    });
    await redis_1.redis.del("showtimes:all");
    await redis_1.redis.del(`showtimes:${existing.roomId}`);
    return true;
};
exports.deleteShowtimeService = deleteShowtimeService;
const getShowtimeTicketTypesService = async (showtimeId) => {
    const cacheKey = `showtime:${showtimeId}:ticket-types`;
    // cache
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    // find showtime
    const showtime = await prisma_1.prisma.showtime.findUnique({
        where: {
            id: showtimeId,
        },
        include: {
            movie: true,
            showtimeTicketTypes: {
                where: { isActive: true },
                include: { ticketType: true },
                orderBy: { createdAt: "asc" },
            },
            room: {
                include: {
                    cinema: true,
                },
            },
        },
    });
    if (!showtime) {
        throw new Error("Showtime not found");
    }
    const cinemaId = showtime.room.cinema.id;
    let ticketTypes;
    if (showtime.showtimeTicketTypes.length > 0) {
        ticketTypes = showtime.showtimeTicketTypes
            .filter((item) => item.ticketType.isActive)
            .map((item) => ({
            id: item.ticketType.id,
            name: item.ticketType.name,
            type: item.ticketType.type,
            price: Number(item.price),
            description: item.ticketType.description ?? "",
        }));
    }
    else {
        const globalTicketTypes = await prisma_1.prisma.ticketType.findMany({
            where: {
                isActive: true,
                OR: [{ cinemaId: null }, { cinemaId }],
            },
            orderBy: { createdAt: "asc" },
        });
        ticketTypes = globalTicketTypes.map((item) => ({
            id: item.id,
            name: item.name,
            type: item.type,
            price: Number(item.price),
            description: item.description ?? "",
        }));
    }
    const result = {
        showtime: {
            id: showtime.id,
            startTime: showtime.startTime,
            endTime: showtime.endTime,
            format: showtime.format,
            language: showtime.language,
            subtitle: showtime.subtitle,
            cinema: {
                id: showtime.room.cinema.id,
                name: showtime.room.cinema.name,
                address: showtime.room.cinema.address,
            },
            room: {
                id: showtime.room.id,
                name: showtime.room.roomName,
            },
            movie: {
                id: showtime.movie.id,
                title: showtime.movie.title,
                posterUrl: showtime.movie.posterUrl,
                ageRating: showtime.movie.ageRating,
            },
        },
        ticketTypes,
    };
    // cache redis
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);
    return result;
};
exports.getShowtimeTicketTypesService = getShowtimeTicketTypesService;
//# sourceMappingURL=showtime.service.js.map