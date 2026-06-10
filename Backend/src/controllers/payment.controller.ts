import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import { prisma } from "../utils/prisma";

import { generateVietQR } from "../utils/vietqr";

export const createPaymentController = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
    });
  }
  console.log("BODY =", req.body);
  const { bookingId } = req.body;
  console.log("BOOKING ID =", bookingId);

  const booking = await prisma.booking.findUnique({
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

  const qrUrl = generateVietQR(booking.finalAmount, booking.bookingCode);

  return res.json({
    bookingId: booking.id,
    bookingCode: booking.bookingCode,
    amount: booking.finalAmount,
    qrUrl,
    expiresAt: booking.expiresAt,
  });
};
