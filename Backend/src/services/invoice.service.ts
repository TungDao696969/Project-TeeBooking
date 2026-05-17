import { generateInvoiceNumber } from "../utils/invoice.utils";
import { prisma } from "../utils/prisma";

export const createInvoiceService = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const result = await prisma.invoice.upsert({
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
      invoiceNumber: generateInvoiceNumber(),
      subtotal: booking.totalTicketPrice + booking.totalComboPrice,
      discount: booking.discountAmount,
      total: booking.finalAmount,
    },
  });

  return result;
};
