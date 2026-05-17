"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingHistoryDetail = exports.getPastBookingsService = void 0;
const prisma_1 = require("../utils/prisma");
const getPastBookingsService = async ({ userId, page = 1, limit = 10, status, search, }) => {
    const skip = (page - 1) * limit;
    const whereClause = {
        userId,
        status: {
            in: ["completed", "cancelled", "refunded"],
        },
    };
    if (status) {
        whereClause.status = status;
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
    return {
        data: bookings,
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
                    room: true,
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
            combos: true,
            payments: true,
            invoice: true,
        },
    });
};
exports.getBookingHistoryDetail = getBookingHistoryDetail;
//# sourceMappingURL=booking-past.service.js.map