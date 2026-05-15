"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCinemaRoomService = exports.updateCinemaRoomService = exports.getCinemaRoomByIdService = exports.getCinemaRoomService = exports.createCinemaRoomService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const createCinemaRoomService = async (data) => {
    const cinema = await prisma_1.prisma.cinemaRoom.create({
        data,
    });
    await redis_1.redis.del(`cinemaRooms:${data.cinemaId}`);
    return cinema;
};
exports.createCinemaRoomService = createCinemaRoomService;
const getCinemaRoomService = async (cinemaId) => {
    const cacheKey = `cinemaRooms:${cinemaId}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const rooms = await prisma_1.prisma.cinemaRoom.findMany({
        where: { cinemaId },
        include: {
            seats: true,
            showtimes: true,
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(rooms), "EX", cache_ttl);
    return rooms;
};
exports.getCinemaRoomService = getCinemaRoomService;
const getCinemaRoomByIdService = async (id) => {
    const cinemaRooms = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id },
        include: {
            seats: true,
            showtimes: true,
        },
    });
    return cinemaRooms;
};
exports.getCinemaRoomByIdService = getCinemaRoomByIdService;
const updateCinemaRoomService = async (id, data) => {
    const room = await prisma_1.prisma.cinemaRoom.update({
        where: { id },
        data,
    });
    await redis_1.redis.del(`cinemaRooms:${room.cinemaId}`);
    return room;
};
exports.updateCinemaRoomService = updateCinemaRoomService;
const deleteCinemaRoomService = async (id) => {
    const room = await prisma_1.prisma.cinemaRoom.delete({
        where: { id },
    });
    await redis_1.redis.del(`cinemaRooms:${room.cinemaId}`);
    return room;
};
exports.deleteCinemaRoomService = deleteCinemaRoomService;
//# sourceMappingURL=cinemaRoom.service.js.map