"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBookingSeatService = exports.releaseSeatService = exports.reservaSeatService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const LOCK_DURATION = 5 * 60 * 1000;
const reservaSeatService = async (showTimeSeatId) => {
    const seat = await prisma_1.prisma.showtimeSeat.findUnique({
        where: {
            id: showTimeSeatId,
        },
    });
    if (!seat) {
        throw new Error("Showtime seat not found");
    }
    // ghế đã boock
    if (seat.status === "booked") {
        throw new Error("Seat already booked");
    }
    // ghế bảo trì
    if (seat.status === "maintenance") {
        throw new Error("Seat unavailable");
    }
    // ghế đang reserved và chưa hết hạn
    if (seat.status === "reserved" &&
        seat.lockedUntil &&
        seat.lockedUntil > new Date()) {
        throw new Error("Seat is temporarily reserved");
    }
    const lockedUntil = new Date(Date.now() + LOCK_DURATION);
    const updatedSeat = await prisma_1.prisma.showtimeSeat.update({
        where: {
            id: showTimeSeatId,
        },
        data: {
            status: "reserved",
            lockedUntil,
        },
    });
    await redis_1.redis.del(`showtime:${updatedSeat.showtimeId}:seats`);
    return updatedSeat;
};
exports.reservaSeatService = reservaSeatService;
const releaseSeatService = async (showtimeSeatId) => {
    const seat = await prisma_1.prisma.showtimeSeat.findUnique({
        where: {
            id: showtimeSeatId,
        },
    });
    if (!seat) {
        throw new Error("Seat not found");
    }
    if (seat.status !== "reserved") {
        throw new Error("Seat is not reserved");
    }
    const updatedSeat = await prisma_1.prisma.showtimeSeat.update({
        where: {
            id: showtimeSeatId,
        },
        data: {
            status: "available",
            lockedUntil: null,
        },
    });
    await redis_1.redis.del(`showtime:${updatedSeat.showtimeId}:seats`);
    return updatedSeat;
};
exports.releaseSeatService = releaseSeatService;
const confirmBookingSeatService = async (showtimeSeatId) => {
    const seat = await prisma_1.prisma.showtimeSeat.findUnique({
        where: {
            id: showtimeSeatId,
        },
    });
    if (!seat) {
        throw new Error("Seat not found");
    }
    // prevent double booking
    if (seat.status === "booked") {
        throw new Error("Seat already booked");
    }
    if (seat.status !== "reserved" ||
        !seat.lockedUntil ||
        seat.lockedUntil < new Date()) {
        throw new Error("Seat reservation expired");
    }
    const updatedSeat = await prisma_1.prisma.showtimeSeat.update({
        where: {
            id: showtimeSeatId,
        },
        data: {
            status: "booked",
            lockedUntil: null,
        },
    });
    await redis_1.redis.del(`showtime:${updatedSeat.showtimeId}:seats`);
    return updatedSeat;
};
exports.confirmBookingSeatService = confirmBookingSeatService;
//# sourceMappingURL=showtimeSeat.service.js.map