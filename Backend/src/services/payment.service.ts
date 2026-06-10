import crypto from "crypto";
import { prisma } from "../utils/prisma";

export const createPaymentBooking = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

export const generateBookingCode = () => {
  return crypto.randomUUID();
};
