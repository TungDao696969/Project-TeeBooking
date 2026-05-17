"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicketQR = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma_1 = require("../utils/prisma");
const generateTicketQR = async (ticketId, userId) => {
    const ticket = await prisma_1.prisma.bookingTicket.findFirst({
        where: {
            id: ticketId,
            booking: {
                userId,
            },
        },
        include: {
            booking: true,
        },
    });
    if (!ticket) {
        throw new Error("Ticket not found or access denied");
    }
    const uploadDir = path_1.default.join(process.cwd(), "uploads", "qrcodes");
    await fs_1.default.promises.mkdir(uploadDir, { recursive: true });
    const fileName = `${ticketId}.png`;
    const filePath = path_1.default.join(uploadDir, fileName);
    const qrCodeUrl = `/uploads/qrcodes/${fileName}`;
    const payload = JSON.stringify({
        ticketId,
        bookingId: ticket.bookingId,
    });
    await qrcode_1.default.toFile(filePath, payload);
    await prisma_1.prisma.bookingTicket.update({
        where: { id: ticketId },
        data: { qrCode: qrCodeUrl },
    });
    return {
        qrCode: qrCodeUrl,
        payload,
    };
};
exports.generateTicketQR = generateTicketQR;
//# sourceMappingURL=ticket-qr.service.js.map