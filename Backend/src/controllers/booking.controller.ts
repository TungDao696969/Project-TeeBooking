import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import { getBookingDetailService } from "../services/booking-current.service";

export const getBookingDetailController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const bookingId = req.params.bookingId;

    if (!bookingId || Array.isArray(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking id",
      });
    }
    const booking = await getBookingDetailService(bookingId, req.user!.id);

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
