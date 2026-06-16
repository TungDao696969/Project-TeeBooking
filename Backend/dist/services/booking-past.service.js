"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingHistoryDetail = exports.getPastBookingsService = void 0;
const prisma_1 = require("../utils/prisma");
const getPastBookingsService = async ({ userId, page = 1, limit = 10, status, search, }) => {
    const skip = (page - 1) * limit;
    const whereClause = {
        userId,
    };
    if (status && status !== "all") {
        whereClause.status = status;
    }
    else {
        whereClause.status = {
            in: ["confirmed", "completed", "cancelled", "refunded"],
        };
    }
    if (search) {
        whereClause.bookingCode = {
            contains: search,
            mode: "insensitive",
        };
    }
    const [bookings, total] = await Promise.all([
        prisma_1.prisma.booking.findMany({
            where: whereClause,
            include: {
                showtime: {
                    include: {
                        movie: true,
                        room: {
                            include: {
                                cinema: true,
                            },
                        },
                    },
                },
                tickets: {
                    include: {
                        showtimeSeat: {
                            include: {
                                seat: true,
                            },
                        },
                    },
                },
                payments: true,
                invoice: true,
            },
            orderBy: {
                bookedAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.booking.count({
            where: whereClause,
        }),
    ]);
    const mappedBookings = bookings.map((booking) => {
        const showtime = booking.showtime;
        if (!showtime)
            return booking;
        const startTimeLocal = new Date(showtime.startTime);
        const formattedTime = startTimeLocal.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Ho_Chi_Minh",
            hour12: false,
        });
        const showDateLocal = new Date(showtime.showDate);
        const formattedDate = showDateLocal.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Ho_Chi_Minh",
        });
        return {
            ...booking,
            showtime: {
                id: showtime.id,
                startTime: formattedTime,
                date: formattedDate,
                movie: {
                    id: showtime.movie.id,
                    title: showtime.movie.title,
                    posterUrl: showtime.movie.posterUrl,
                    durationMinutes: showtime.movie.durationMinutes,
                },
                cinema: {
                    id: showtime.room?.cinema?.id || "",
                    name: showtime.room?.cinema?.name || "Cinema",
                },
                room: {
                    id: showtime.room?.id || "",
                    roomName: showtime.room?.roomName || "",
                },
            },
        };
    });
    return {
        data: mappedBookings,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getPastBookingsService = getPastBookingsService;
const getBookingHistoryDetail = async (bookingId, userId) => {
    return prisma_1.prisma.booking.findFirst({
        where: {
            id: bookingId,
            userId,
        },
        include: {
            showtime: {
                include: {
                    movie: true,
                    room: {
                        include: {
                            cinema: true,
                        },
                    },
                },
            },
            tickets: {
                include: {
                    showtimeSeat: {
                        include: {
                            seat: true,
                        },
                    },
                },
            },
            combos: {
                include: {
                    combo: true,
                },
            },
            payments: true,
            invoice: true,
        },
    });
};
exports.getBookingHistoryDetail = getBookingHistoryDetail;
//# sourceMappingURL=booking-past.service.js.map