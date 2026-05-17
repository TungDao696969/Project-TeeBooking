import QRCode from "qrcode";
import path from "path";
import fs from "fs";
import { prisma } from "../utils/prisma";

export const generateTicketQR = async (ticketId: string, userId: string) => {
  const ticket = await prisma.bookingTicket.findFirst({
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

  const uploadDir = path.join(process.cwd(), "uploads", "qrcodes");
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const fileName = `${ticketId}.png`;
  const filePath = path.join(uploadDir, fileName);
  const qrCodeUrl = `/uploads/qrcodes/${fileName}`;
  const payload = JSON.stringify({
    ticketId,
    bookingId: ticket.bookingId,
  });

  await QRCode.toFile(filePath, payload);

  await prisma.bookingTicket.update({
    where: { id: ticketId },
    data: { qrCode: qrCodeUrl },
  });

  return {
    qrCode: qrCodeUrl,
    payload,
  };
};
