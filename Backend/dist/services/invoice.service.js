"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceService = void 0;
const invoice_utils_1 = require("../utils/invoice.utils");
const prisma_1 = require("../utils/prisma");
const createInvoiceService = async (bookingId) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    const result = await prisma_1.prisma.invoice.upsert({
        where: {
            bookingId,
        },
        update: {
            subtotal: booking.totalTicketPrice + booking.totalComboPrice,
            discount: booking.discountAmount,
            total: booking.finalAmount,
        },
        create: {
            bookingId,
            invoiceNumber: (0, invoice_utils_1.generateInvoiceNumber)(),
            subtotal: booking.totalTicketPrice + booking.totalComboPrice,
            discount: booking.discountAmount,
            total: booking.finalAmount,
        },
    });
    return result;
};
exports.createInvoiceService = createInvoiceService;
//# sourceMappingURL=invoice.service.js.map