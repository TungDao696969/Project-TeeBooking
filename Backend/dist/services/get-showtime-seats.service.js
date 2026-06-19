"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowtimeSeatsService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const CACHE_TTL = 60; // 1 minute
const getShowtimeSeatsService = async (showtimeId) => {
    const cacheKey = `showtime:${showtimeId}:seats`;
    // cache redis
    const cachedData = await redis_1.redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    // get showtime
    const showtime = await prisma_1.prisma.showtime.findFirst({
        where: {
            id: showtimeId,
            deletedAt: null,
        },
        include: {
            movie: {
                select: {
                    id: true,
                    title: true,
                    posterUrl: true,
                },
            },
            room: {
                include: {
                    cinema: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            province: true,
                        },
                    },
                },
            },
            seats: {
                include: {
                    seat: true,
                },
                orderBy: [
                    {
                        seat: {
                            seatRow: "asc",
                        },
                    },
                    {
                        seat: {
                            seatNumber: "asc",
                        },
                    },
                ],
            },
        },
    });
    if (!showtime) {
        throw new Error("Showtime not found");
    }
    // transform seats
    const seats = showtime.seats.map((showtimeSeat) => {
        const isLockedExpired = showtimeSeat.status === "reserved" &&
            showtimeSeat.lockedUntil &&
            new Date(showtimeSeat.lockedUntil).getTime() < Date.now();
        return {
            id: showtimeSeat.id,
            seatId: showtimeSeat.seat.id,
            seatCode: showtimeSeat.seat.seatCode,
            seatRow: showtimeSeat.seat.seatRow,
            seatNumber: showtimeSeat.seat.seatNumber,
            seatType: showtimeSeat.seat.seatType,
            status: isLockedExpired ? "available" : showtimeSeat.status,
            price: Number(showtime.basePrice) + Number(showtimeSeat.seat.extraPrice),
            extraPrice: showtimeSeat.seat.extraPrice,
            lockedUntil: isLockedExpired ? null : showtimeSeat.lockedUntil,
            isCouple: showtimeSeat.seat.seatType === "couple",
        };
    });
    // build seat rows
    const rowsMap = {};
    for (const seat of seats) {
        const row = seat.seatRow;
        if (!rowsMap[row]) {
            rowsMap[row] = [];
        }
        rowsMap[row].push(seat);
    }
    const seatRows = Object.keys(rowsMap)
        .sort()
        .map((row) => ({
        row,
        seats: rowsMap[row].sort((a, b) => a.seatNumber - b.seatNumber),
    }));
    // statistics
    const statistics = {
        totalSeats: seats.length,
        availableSeats: seats.filter((seat) => seat.status === "available").length,
        bookedSeats: seats.filter((seat) => seat.status === "booked").length,
        lockedSeats: seats.filter((seat) => seat.status === "locked").length,
    };
    const result = {
        showtime: {
            id: showtime.id,
            showDate: showtime.showDate,
            startTime: showtime.startTime,
            endTime: showtime.endTime,
            format: showtime.format,
            language: showtime.language,
            subtitle: showtime.subtitle,
            basePrice: showtime.basePrice,
            movie: showtime.movie,
            cinema: showtime.room.cinema,
            room: {
                id: showtime.room.id,
                name: showtime.room.roomName,
                type: showtime.room.roomType,
                totalSeats: showtime.room.totalSeats,
            },
        },
        statistics,
        seatLayout: {
            totalRows: seatRows.length,
            rows: seatRows.map((r) => r.row),
        },
        seatRows,
    };
    // cache
    await redis_1.redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);
    return result;
};
exports.getShowtimeSeatsService = getShowtimeSeatsService;
//# sourceMappingURL=get-showtime-seats.service.js.map