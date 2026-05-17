"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redis_1 = require("../utils/redis");
const booking_confirmation_service_1 = require("../services/booking-confirmation.service");
const invoice_service_1 = require("../services/invoice.service");
const invoice_pdf_service_1 = require("../services/invoice-pdf.service");
const prisma_1 = require("../utils/prisma");
const mail_1 = require("../utils/mail");
new bullmq_1.Worker("payment-success", async (job) => {
    const { bookingId } = job.data;
    const booking = await (0, booking_confirmation_service_1.confirmBookingService)(bookingId);
    const invoice = await (0, invoice_service_1.createInvoiceService)(bookingId);
    const pdfPath = await (0, invoice_pdf_service_1.generateInvoicePDF)(invoice, booking);
    await prisma_1.prisma.invoice.update({
        where: { id: invoice.id },
        data: {
            pdfUrl: pdfPath,
        },
    });
    if (booking.user?.email) {
        try {
            await (0, mail_1.sendInvoiceEmail)({
                to: booking.user.email,
                pdfPath,
            });
        }
        catch (error) {
            console.error("[PAYMENT SUCCESS] send invoice email failed", error);
        }
    }
}, {
    connection: redis_1.redis,
});
//# sourceMappingURL=payment-success.worker.js.map