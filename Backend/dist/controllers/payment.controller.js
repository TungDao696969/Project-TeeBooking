"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentController = void 0;
const prisma_1 = require("../utils/prisma");
const vietqr_1 = require("../utils/vietqr");
const createPaymentController = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
        });
    }
    console.log("BODY =", req.body);
    const { bookingId } = req.body;
    console.log("BOOKING ID =", bookingId);
    const booking = await prisma_1.prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    console.log("BOOKING =", booking);
    if (!booking) {
        return res.status(404).json({
            message: "Booking not found",
        });
    }
    const qrUrl = (0, vietqr_1.generateVietQR)(booking.finalAmount, booking.bookingCode);
    return res.json({
        bookingId: booking.id,
        bookingCode: booking.bookingCode,
        amount: booking.finalAmount,
        qrUrl,
        expiresAt: booking.expiresAt,
    });
};
exports.createPaymentController = createPaymentController;
//# sourceMappingURL=payment.controller.js.map