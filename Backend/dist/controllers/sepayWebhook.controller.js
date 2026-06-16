"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sepayWebhookController = void 0;
const prisma_1 = require("../utils/prisma");
const payment_success_queue_1 = require("../queue/payment-success.queue");
const sepayWebhookController = async (req, res) => {
    try {
        console.log("SEPAY WEBHOOK RECEIVED:", req.body);
        const { content, transferAmount, id, referenceCode } = req.body;
        const match = String(content).match(/BK\d{8}/);
        const codeToSearch = match ? match[0] : content;
        console.log("Extracted Booking Code:", codeToSearch);
        const booking = await prisma_1.prisma.booking.findUnique({
            where: {
                bookingCode: codeToSearch,
            },
        });
        if (!booking) {
            return res
                .status(404)
                .json({ success: false, message: "Booking not found" });
        }
        if (Number(booking.finalAmount) !== Number(transferAmount)) {
            return res
                .status(400)
                .json({ success: false, message: "Amount mismatch" });
        }
        if (booking.status === "confirmed") {
            return res.status(200).json({ success: true });
        }
        // Update payment record and set paymentStatus to "paid"
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.payment.create({
                data: {
                    bookingId: booking.id,
                    paymentMethod: "bank_transfer",
                    amount: Number(transferAmount),
                    transactionCode: String(referenceCode || id),
                    status: "paid",
                    paidAt: new Date(),
                },
            });
            await tx.booking.update({
                where: {
                    id: booking.id,
                },
                data: {
                    paymentStatus: "paid",
                },
            });
        });
        // Enqueue the payment success job so the worker handles seat confirmation, PDF generation, and sends both QR + Invoice emails
        await (0, payment_success_queue_1.enqueuePaymentSuccessJob)(booking.id);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
exports.sepayWebhookController = sepayWebhookController;
//# sourceMappingURL=sepayWebhook.controller.js.map