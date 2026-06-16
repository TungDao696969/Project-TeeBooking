"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceDeleteShowtimeService = exports.restoreShowtimeService = exports.getTrashShowtimesService = exports.getShowtimeTicketTypesService = exports.deleteShowtimeService = exports.updateShowtimeService = exports.getShowtimeByIdService = exports.getAllShowtimesService = exports.createShowtimeService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const clearShowtimesCache = async () => {
    const keys = await redis_1.redis.keys("showtimes:*");
    if (keys.length > 0) {
        await redis_1.redis.del(...keys);
    }
};
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
    if (!room.isActive) {
        throw new Error("Cinema room is disabled");
    }
    const seats = await prisma_1.prisma.seat.findMany({
        where: { roomId: room.id },
    });
    const showTime = await prisma_1.prisma.$transaction(async (tx) => {
        const createdShowtime = await tx.showtime.create({
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
        if (seats.length > 0) {
            await tx.showtimeSeat.createMany({
                data: seats.map((seat) => ({
                    showtimeId: createdShowtime.id,
                    seatId: seat.id,
                    status: "available",
                    finalPrice: Number(data.basePrice) + Number(seat.extraPrice),
                    lockedUntil: null,
                })),
            });
        }
        return createdShowtime;
    });
    await clearShowtimesCache();
    return showTime;
};
exports.createShowtimeService = createShowtimeService;
const getAllShowtimesService = async (page = 1, limit = 10) => {
    const cacheKey = `showtimes:${page}:${limit}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const skip = (page - 1) * limit;
    const [showtimes, total] = await Promise.all([
        prisma_1.prisma.showtime.findMany({
            where: {
                deletedAt: null,
            },
            skip,
            take: limit,
            include: {
                movie: true,
                room: true,
                seats: true,
                bookings: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.showtime.count({
            where: {
                deletedAt: null,
            },
        }),
    ]);
    const result = {
        count: showtimes.length,
        data: showtimes,
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
exports.getAllShowtimesService = getAllShowtimesService;
const getShowtimeByIdService = async (id) => {
    return prisma_1.prisma.showtime.findFirst({
        where: {
            id,
            deletedAt: null,
        },
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
    await clearShowtimesCache();
    return updated;
};
exports.updateShowtimeService = updateShowtimeService;
const deleteShowtimeService = async (id) => {
    const existing = await prisma_1.prisma.showtime.findUnique({
        where: { id },
        include: {
            bookings: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (!existing) {
        throw new Error("Showtime not found");
    }
    if (existing.deletedAt) {
        throw new Error("Showtime already deleted");
    }
    if (existing.bookings.length > 0) {
        throw new Error("Cannot delete showtime with existing bookings");
    }
    const showtime = await prisma_1.prisma.showtime.update({
        where: { id },
        data: {
            isActive: false,
            deletedAt: new Date(),
        },
    });
    await clearShowtimesCache();
    return showtime;
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
const getTrashShowtimesService = async () => {
    const cacheKey = "showtimes:trash";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const showtimes = await prisma_1.prisma.showtime.findMany({
        where: {
            deletedAt: {
                not: null,
            },
        },
        include: {
            movie: true,
            room: {
                include: {
                    cinema: true,
                },
            },
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
    const result = {
        data: showtimes,
    };
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", 300);
    return result;
};
exports.getTrashShowtimesService = getTrashShowtimesService;
const restoreShowtimeService = async (id) => {
    const showtime = await prisma_1.prisma.showtime.findUnique({
        where: { id },
    });
    if (!showtime) {
        throw new Error("Showtime not found");
    }
    if (!showtime.deletedAt) {
        throw new Error("Showtime is not deleted");
    }
    const restored = await prisma_1.prisma.showtime.update({
        where: { id },
        data: {
            isActive: true,
            deletedAt: null,
        },
    });
    await clearShowtimesCache();
    return restored;
};
exports.restoreShowtimeService = restoreShowtimeService;
const forceDeleteShowtimeService = async (id) => {
    const showtime = await prisma_1.prisma.showtime.findUnique({
        where: { id },
    });
    if (!showtime) {
        throw new Error("Showtime not found");
    }
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.showtimeTicketType.deleteMany({
            where: {
                showtimeId: id,
            },
        }),
        prisma_1.prisma.showtimeSeat.deleteMany({
            where: {
                showtimeId: id,
            },
        }),
        prisma_1.prisma.showtime.delete({
            where: {
                id,
            },
        }),
    ]);
    await clearShowtimesCache();
    return true;
};
exports.forceDeleteShowtimeService = forceDeleteShowtimeService;
//# sourceMappingURL=showtime.service.js.map