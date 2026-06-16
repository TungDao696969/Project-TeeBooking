"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeatTypeService = exports.restoreSeatService = exports.getTrashSeatsService = exports.deleteSeatService = exports.updateSeatService = exports.getSeatByIdService = exports.getSeatsByRoomService = exports.getAllSeatsService = exports.generateSeatService = exports.createSeatService = void 0;
const enums_1 = require("../generated/prisma/enums");
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
    if (!room.isActive) {
        throw new Error("Cinema room is disabled");
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
const generateSeatService = async ({ roomId, rows, seatsPerRow, }) => {
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: {
            id: roomId,
        },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    if (!room.isActive) {
        throw new Error("Cinema room is disabled");
    }
    const seatCount = await prisma_1.prisma.seat.count({
        where: {
            roomId,
        },
    });
    if (seatCount > 0) {
        throw new Error("Room already contains seats");
    }
    const seatData = [];
    for (const row of rows) {
        for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
            seatData.push({
                roomId,
                seatRow: row,
                seatNumber,
                seatCode: `${row}${seatNumber}`,
                seatType: enums_1.SeatType.standard,
                extraPrice: 0,
            });
        }
    }
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.seat.createMany({
            data: seatData,
        });
    });
    await Promise.all([redis_1.redis.del(`seats:${roomId}`), redis_1.redis.del("seats:all")]);
    return seatData;
};
exports.generateSeatService = generateSeatService;
const getAllSeatsService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [seats, total] = await Promise.all([
        prisma_1.prisma.seat.findMany({
            where: {
                deletedAt: null,
                isActive: true,
            },
            include: {
                room: {
                    include: {
                        cinema: true,
                    },
                },
                showtimeSeats: true,
            },
            orderBy: [{ seatRow: "desc" }, { seatNumber: "desc" }],
            skip,
            take: limit,
        }),
        prisma_1.prisma.seat.count({
            where: {
                deletedAt: null,
                isActive: true,
            },
        }),
    ]);
    return {
        seats,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getAllSeatsService = getAllSeatsService;
const getSeatsByRoomService = async (roomId) => {
    const cacheKey = `seats:${roomId}`;
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const seats = await prisma_1.prisma.seat.findMany({
        where: {
            roomId,
            deletedAt: null,
            isActive: true,
        },
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
    return prisma_1.prisma.seat.findFirst({
        where: {
            id,
            deletedAt: null,
        },
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
    if (data.seatCode) {
        const duplicate = await prisma_1.prisma.seat.findFirst({
            where: {
                roomId: existing.roomId,
                seatCode: data.seatCode,
                NOT: { id },
            },
        });
        if (duplicate) {
            throw new Error("Seat code already exists");
        }
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
    const seat = await prisma_1.prisma.seat.findUnique({
        where: { id },
        include: {
            showtimeSeats: true,
        },
    });
    if (!seat) {
        throw new Error("Seat not found");
    }
    if (!seat.isActive) {
        throw new Error("Seat already deleted");
    }
    if (seat.showtimeSeats.length > 0) {
        throw new Error("Cannot delete seat because it is already used in showtimes/bookings");
    }
    const deletedSeat = await prisma_1.prisma.seat.update({
        where: { id },
        data: {
            isActive: false,
            deletedAt: new Date(),
        },
    });
    await redis_1.redis.del(`seats:${seat.roomId}`);
    await redis_1.redis.del("seats:all");
    await redis_1.redis.del("seats:trash");
    return deletedSeat;
};
exports.deleteSeatService = deleteSeatService;
const getTrashSeatsService = async () => {
    const cacheKey = "seats:trash";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const seats = await prisma_1.prisma.seat.findMany({
        where: {
            deletedAt: {
                not: null,
            },
        },
        include: {
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
    await redis_1.redis.set(cacheKey, JSON.stringify(seats), "EX", 300);
    return seats;
};
exports.getTrashSeatsService = getTrashSeatsService;
const restoreSeatService = async (id) => {
    const seat = await prisma_1.prisma.seat.findUnique({
        where: { id },
    });
    if (!seat) {
        throw new Error("Seat not found");
    }
    if (!seat.deletedAt) {
        throw new Error("Seat is not deleted");
    }
    const restoredSeat = await prisma_1.prisma.seat.update({
        where: { id },
        data: {
            isActive: true,
            deletedAt: null,
        },
    });
    await redis_1.redis.del(`seats:${seat.roomId}`);
    await redis_1.redis.del("seats:all");
    await redis_1.redis.del("seats:trash");
    return restoredSeat;
};
exports.restoreSeatService = restoreSeatService;
const updateSeatTypeService = async ({ roomId, startRow, endRow, seatType, }) => {
    const room = await prisma_1.prisma.cinemaRoom.findUnique({
        where: { id: roomId },
    });
    if (!room) {
        throw new Error("Cinema room not found");
    }
    const updated = await prisma_1.prisma.seat.updateMany({
        where: {
            roomId,
            seatRow: {
                gte: startRow,
                lte: endRow,
            },
        },
        data: {
            seatType,
        },
    });
    await redis_1.redis.del(`seats:${roomId}`);
    await redis_1.redis.del("seats:all");
    return updated;
};
exports.updateSeatTypeService = updateSeatTypeService;
//# sourceMappingURL=seat.service.js.map