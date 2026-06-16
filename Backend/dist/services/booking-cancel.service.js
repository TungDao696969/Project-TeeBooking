"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const dayjs_1 = __importDefault(require("dayjs"));
const cancelBookingService = async ({ bookingId, userId, }) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findFirst({
            where: {
                id: bookingId,
                userId,
            },
            include: {
                showtime: true,
                payments: true,
                tickets: true,
            },
        });
        if (!booking) {
            throw new Error("Booking not found");
        }
        if (["cancelled", "completed", "refunded"].includes(booking.status)) {
            throw new Error(`Cannot cancel ${booking.status} booking`);
        }
        // chỉ cancel trước 30 phút
        const cutoffTime = (0, dayjs_1.default)(booking.showtime.startTime).subtract(30, "minute");
        if ((0, dayjs_1.default)().isAfter(cutoffTime)) {
            throw new Error("Booking cannot be cancelled less than 30 minutes before showtime");
        }
        // update booking
        await tx.booking.update({
            where: { id: bookingId },
            data: {
                status: "cancelled",
            },
        });
        // release seats if any
        const showtimeSeatIds = booking.tickets.map((ticket) => ticket.showtimeSeatId);
        if (showtimeSeatIds.length > 0) {
            await tx.showtimeSeat.updateMany({
                where: {
                    id: {
                        in: showtimeSeatIds,
                    },
                },
                data: {
                    status: "available",
                    lockedUntil: null,
                },
            });
        }
        // if already paid, mark refund flow
        const paidPayment = booking.payments.find((payment) => payment.status === "paid");
        if (paidPayment) {
            await tx.booking.update({
                where: { id: bookingId },
                data: {
                    paymentStatus: "refunded",
                },
            });
        }
        return {
            success: true,
            message: "Booking cancelled successfully",
            showtimeId: booking.showtimeId,
        };
    });
    await redis_1.redis.del(`showtime:${result.showtimeId}:seats`);
    return {
        success: result.success,
        message: result.message,
    };
};
exports.cancelBookingService = cancelBookingService;
//# sourceMappingURL=booking-cancel.service.js.map