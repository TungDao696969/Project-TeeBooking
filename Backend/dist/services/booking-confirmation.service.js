"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBookingService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const send_booking_email_service_1 = require("./send-booking-email.service");
const confirmBookingService = async (bookingId) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({
            where: {
                id: bookingId,
            },
            include: {
                tickets: true,
                user: true,
            },
        });
        if (!booking) {
            throw new Error("Booking not found");
        }
        if (booking.status === "confirmed") {
            return booking;
        }
        if (booking.paymentStatus !== "paid") {
            throw new Error("Cannot confirm unpaid booking");
        }
        const updateBooking = await tx.booking.update({
            where: {
                id: bookingId,
            },
            include: {
                tickets: true,
                user: true,
            },
            data: {
                status: "confirmed",
            },
        });
        const showtimeSeatIds = booking.tickets.map((ticket) => ticket.showtimeSeatId);
        if (showtimeSeatIds.length > 0) {
            await tx.showtimeSeat.updateMany({
                where: {
                    id: {
                        in: showtimeSeatIds,
                    },
                },
                data: {
                    status: "booked",
                    lockedUntil: null,
                },
            });
        }
        await tx.bookingTicket.updateMany({
            where: { bookingId },
            data: {
                checkinStatus: false,
            },
        });
        return updateBooking;
    });
    await redis_1.redis.del(`showtime:${result.showtimeId}:seats`);
    // ── Send confirmation email with QR code (non-blocking) ──────────────────
    (0, send_booking_email_service_1.sendBookingConfirmationEmail)(bookingId).catch((err) => console.error("[ConfirmBooking] Failed to send confirmation email:", err));
    return result;
};
exports.confirmBookingService = confirmBookingService;
//# sourceMappingURL=booking-confirmation.service.js.map