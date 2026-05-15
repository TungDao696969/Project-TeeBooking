"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSeatService = exports.updateSeatService = exports.getSeatByIdService = exports.getSeatsByRoomService = exports.getAllSeatsService = exports.generateSeatService = exports.createSeatService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const cache_ttl = Number(process.env.CACHE_TTL);
const createSeatService = async (data) => {
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: {
            id: data.roomId,
        },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    const existingSeat = await prisma_1.prisma.seat.findFirst({
        where: {
            roomId: data.roomId,
            seatCode: data.seatCode,
        },
    });
    if (existingSeat) {
        throw new Error("Seat code already exists in this room");
    }
    const seat = await prisma_1.prisma.seat.create({
        data,
        include: {
            room: true,
        },
    });
    await redis_1.redis.del(`seats:${data.roomId}`);
    await redis_1.redis.del("seats:all");
    return seat;
};
exports.createSeatService = createSeatService;
// tự động tạo ghế ngồi
const generateSeatService = async (roomId, rows, seatsPerRow, seatType = "standard") => {
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id: roomId },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    const seatData = [];
    for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
            seatData.push({
                roomId,
                seatRow: row,
                seatNumber: i,
                seatCode: `${row}${i}`,
                seatType,
                extraPrice: 0,
            });
        }
    }
    await prisma_1.prisma.seat.createMany({
        data: seatData,
        skipDuplicates: true,
    });
    await redis_1.redis.del(`seats:${roomId}`);
    await redis_1.redis.del("seats:all");
    return seatData;
};
exports.generateSeatService = generateSeatService;
const getAllSeatsService = async () => {
    const cacheKey = "seats:all";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const seats = await prisma_1.prisma.seat.findMany({
        include: {
            room: {
                include: {
                    cinema: true,
                },
            },
            showtimeSeats: true,
        },
        orderBy: [{ seatRow: "asc" }, { seatNumber: "asc" }],
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(seats), "EX", cache_ttl);
    return seats;
};
exports.getAllSeatsService = getAllSeatsService;
const getSeatsByRoomService = async (roomId) => {
    const cacheKey = `seats:${roomId}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const seats = await prisma_1.prisma.seat.findMany({
        where: { roomId },
        include: {
            room: true,
            showtimeSeats: true,
        },
        orderBy: [{ seatRow: "asc" }, { seatNumber: "asc" }],
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(seats), "EX", cache_ttl);
    return seats;
};
exports.getSeatsByRoomService = getSeatsByRoomService;
const getSeatByIdService = async (id) => {
    return prisma_1.prisma.seat.findUnique({
        where: { id },
        include: {
            room: true,
            showtimeSeats: true,
        },
    });
};
exports.getSeatByIdService = getSeatByIdService;
// UPDATE
const updateSeatService = async (id, data) => {
    const existing = await prisma_1.prisma.seat.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Seat not found");
    }
    const updated = await prisma_1.prisma.seat.update({
        where: { id },
        data,
        include: {
            room: true,
        },
    });
    await redis_1.redis.del(`seats:${existing.roomId}`);
    await redis_1.redis.del("seats:all");
    return updated;
};
exports.updateSeatService = updateSeatService;
// DELETE
const deleteSeatService = async (id) => {
    const existing = await prisma_1.prisma.seat.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Seat not found");
    }
    await prisma_1.prisma.seat.delete({
        where: { id },
    });
    await redis_1.redis.del(`seats:${existing.roomId}`);
    await redis_1.redis.del("seats:all");
    return true;
};
exports.deleteSeatService = deleteSeatService;
//# sourceMappingURL=seat.service.js.map