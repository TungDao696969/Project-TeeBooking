"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCinemaRoomService = exports.getTrashCinemaRoomsService = exports.deleteCinemaRoomService = exports.updateCinemaRoomService = exports.getCinemaRoomByIdService = exports.getAllCinemaRoomsService = exports.getRoomsByCinemaIdService = exports.createCinemaRoomService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const clearCinemaRoomCache = async () => {
    const keys = await redis_1.redis.keys("cinemaRooms:*");
    if (keys.length > 0) {
        await redis_1.redis.del(...keys);
    }
};
const createCinemaRoomService = async (data) => {
    const cinema = await prisma_1.prisma.cinema.findUnique({
        where: {
            id: data.cinemaId,
        },
    });
    if (!cinema) {
        throw new Error("Cinema not found");
    }
    const room = await prisma_1.prisma.cinemaRoom.create({
        data,
    });
    await redis_1.redis.del(`cinemaRooms:${data.cinemaId}`);
    return room;
};
exports.createCinemaRoomService = createCinemaRoomService;
const getRoomsByCinemaIdService = async ({ cinemaId, page, limit, }) => {
    const skip = (page - 1) * limit;
    const cacheKey = `cinemaRooms:${cinemaId}:page:${page}:limit:${limit}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const [rooms, total] = await Promise.all([
        prisma_1.prisma.cinemaRoom.findMany({
            where: {
                cinemaId,
                isActive: true,
            },
            include: {
                seats: true,
                showtimes: {
                    where: {
                        deletedAt: null,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.cinemaRoom.count({
            where: {
                cinemaId,
                isActive: true,
                deletedAt: null,
            },
        }),
    ]);
    const result = {
        data: rooms,
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
exports.getRoomsByCinemaIdService = getRoomsByCinemaIdService;
const getAllCinemaRoomsService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [rooms, total] = await Promise.all([
        prisma_1.prisma.cinemaRoom.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                seats: true,
                showtimes: {
                    where: {
                        deletedAt: null,
                    },
                },
                cinema: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.cinemaRoom.count({
            where: {
                deletedAt: null,
            },
        }),
    ]);
    return {
        data: rooms,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getAllCinemaRoomsService = getAllCinemaRoomsService;
const getCinemaRoomByIdService = async (id) => {
    const room = await prisma_1.prisma.cinemaRoom.findFirst({
        where: {
            id,
            deletedAt: null,
        },
        include: {
            seats: true,
            showtimes: {
                where: {
                    deletedAt: null,
                },
            },
            cinema: true,
        },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    return room;
};
exports.getCinemaRoomByIdService = getCinemaRoomByIdService;
const updateCinemaRoomService = async (id, data) => {
    const existing = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Cinema room not found");
    }
    const room = await prisma_1.prisma.cinemaRoom.update({
        where: { id },
        data,
    });
    await redis_1.redis.del(`cinemaRooms:${room.cinemaId}`);
    return room;
};
exports.updateCinemaRoomService = updateCinemaRoomService;
const deleteCinemaRoomService = async (id) => {
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    if (room.deletedAt) {
        throw new Error("Cinema room already deleted");
    }
    const upcomingShowtime = await prisma_1.prisma.showtime.findFirst({
        where: {
            roomId: id,
            deletedAt: null,
            startTime: {
                gte: new Date(),
            },
        },
    });
    if (upcomingShowtime) {
        throw new Error("Cannot delete room with upcoming showtimes");
    }
    const deletedRoom = await prisma_1.prisma.cinemaRoom.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            isActive: false,
        },
    });
    await clearCinemaRoomCache();
    return deletedRoom;
};
exports.deleteCinemaRoomService = deleteCinemaRoomService;
const getTrashCinemaRoomsService = async () => {
    const cacheKey = "cinemaRooms:trash";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const rooms = await prisma_1.prisma.cinemaRoom.findMany({
        where: {
            deletedAt: {
                not: null,
            },
        },
        include: {
            cinema: true,
        },
        orderBy: {
            deletedAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(rooms), "EX", cache_ttl);
    return rooms;
};
exports.getTrashCinemaRoomsService = getTrashCinemaRoomsService;
const restoreCinemaRoomService = async (id) => {
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    if (!room.deletedAt) {
        throw new Error("Cinema room is not in trash");
    }
    const restoredRoom = await prisma_1.prisma.cinemaRoom.update({
        where: { id },
        data: {
            deletedAt: null,
            isActive: true,
        },
    });
    await clearCinemaRoomCache();
    await redis_1.redis.del("cinemaRooms:trash");
    return restoredRoom;
};
exports.restoreCinemaRoomService = restoreCinemaRoomService;
//# sourceMappingURL=cinemaRoom.service.js.map