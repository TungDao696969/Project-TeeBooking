"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCancelBookingService = exports.updateAdminBookingStatusService = exports.getAdminBookingDetailService = exports.getAdminBookingsService = void 0;
const prisma_1 = require("../../utils/prisma");
const redis_1 = require("../../utils/redis");
const getAdminBookingsService = async ({ page = 1, limit = 10, search = "", status, }) => {
    const skip = (page - 1) * limit;
    const whereClause = {};
    if (status) {
        whereClause.status = status;
    }
    if (search) {
        whereClause.OR = [
            { bookingCode: { contains: search, mode: "insensitive" } },
            { user: { email: { contains: search, mode: "insensitive" } } },
            { user: { phone: { contains: search, mode: "insensitive" } } },
        ];
    }
    const [bookings, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.booking.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                bookedAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                        avatarUrl: true,
                    },
                },
                showtime: {
                    include: {
                        movie: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                        room: {
                            select: {
                                id: true,
                                roomName: true,
                                cinema: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }),
        prisma_1.prisma.booking.count({
            where: whereClause,
        }),
    ]);
    return {
        bookings,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getAdminBookingsService = getAdminBookingsService;
const getAdminBookingDetailService = async (id) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true,
                    avatarUrl: true,
                },
            },
            showtime: {
                include: {
                    movie: {
                        select: {
                            id: true,
                            title: true,
                            posterUrl: true,
                        },
                    },
                    room: {
                        select: {
                            id: true,
                            roomName: true,
                            cinema: {
                                select: {
                                    id: true,
                                    name: true,
                                    address: true,
                                },
                            },
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
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    return booking;
};
exports.getAdminBookingDetailService = getAdminBookingDetailService;
// ─── Allowed status transitions ────────────────────────────────────────────
const ALLOWED_TRANSITIONS = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"],
    completed: ["refunded"],
    cancelled: ["refunded"],
    refunded: [],
};
const updateAdminBookingStatusService = async (id, newStatus) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id },
        include: { tickets: true, payments: true },
    });
    if (!booking)
        throw new Error("Booking not found");
    const { showtimeId } = booking;
    const allowed = ALLOWED_TRANSITIONS[booking.status] ?? [];
    if (!allowed.includes(newStatus)) {
        throw new Error(`Cannot transition from ${booking.status} to ${newStatus}`);
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // Update booking status
        const updated = await tx.booking.update({
            where: { id },
            data: { status: newStatus },
        });
        // If cancelled → release seats
        if (newStatus === "cancelled") {
            const seatIds = booking.tickets.map((t) => t.showtimeSeatId);
            if (seatIds.length > 0) {
                await tx.showtimeSeat.updateMany({
                    where: { id: { in: seatIds } },
                    data: { status: "available", lockedUntil: null },
                });
            }
        }
        // If refunded → create refund record for paid payments
        if (newStatus === "refunded") {
            const paidPayments = booking.payments.filter((p) => p.status === "paid");
            for (const payment of paidPayments) {
                await tx.refund.create({
                    data: {
                        bookingId: id,
                        paymentId: payment.id,
                        refundAmount: payment.amount,
                        refundReason: "Admin manual refund",
                        refundStatus: "processed",
                        processedAt: new Date(),
                    },
                });
                await tx.payment.update({
                    where: { id: payment.id },
                    data: { status: "refunded" },
                });
            }
            await tx.booking.update({
                where: { id },
                data: { paymentStatus: "refunded" },
            });
        }
        return updated;
    });
    if (newStatus === "cancelled" || newStatus === "refunded") {
        await redis_1.redis.del(`showtime:${showtimeId}:seats`);
    }
    return result;
};
exports.updateAdminBookingStatusService = updateAdminBookingStatusService;
const adminCancelBookingService = async (id, { refund }) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id },
        include: { tickets: true, payments: true },
    });
    if (!booking)
        throw new Error("Booking not found");
    if (["cancelled", "refunded"].includes(booking.status)) {
        throw new Error(`Booking is already ${booking.status}`);
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // Cancel booking
        await tx.booking.update({
            where: { id },
            data: { status: "cancelled" },
        });
        // Release seats
        const seatIds = booking.tickets.map((t) => t.showtimeSeatId);
        if (seatIds.length > 0) {
            await tx.showtimeSeat.updateMany({
                where: { id: { in: seatIds } },
                data: { status: "available", lockedUntil: null },
            });
        }
        // If refund requested, process it
        if (refund) {
            const paidPayments = booking.payments.filter((p) => p.status === "paid");
            for (const payment of paidPayments) {
                await tx.refund.create({
                    data: {
                        bookingId: id,
                        paymentId: payment.id,
                        refundAmount: payment.amount,
                        refundReason: "Admin cancelled booking",
                        refundStatus: "processed",
                        processedAt: new Date(),
                    },
                });
                await tx.payment.update({
                    where: { id: payment.id },
                    data: { status: "refunded" },
                });
            }
            await tx.booking.update({
                where: { id },
                data: { status: "refunded", paymentStatus: "refunded" },
            });
        }
        return {
            success: true,
            message: refund ? "Booking cancelled and refunded" : "Booking cancelled",
        };
    });
    await redis_1.redis.del(`showtime:${booking.showtimeId}:seats`);
    return result;
};
exports.adminCancelBookingService = adminCancelBookingService;
//# sourceMappingURL=booking.service.js.map