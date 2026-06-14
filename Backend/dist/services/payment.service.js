"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBookingCode = exports.createPaymentBooking = void 0;
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../utils/prisma");
const createPaymentBooking = async (bookingId) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    return booking;
};
exports.createPaymentBooking = createPaymentBooking;
const generateBookingCode = () => {
    return crypto_1.default.randomUUID();
};
exports.generateBookingCode = generateBookingCode;
//# sourceMappingURL=payment.service.js.map