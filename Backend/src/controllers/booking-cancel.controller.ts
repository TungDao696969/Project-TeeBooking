import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { cancelBookingService } from "../services/booking-cancel.service";

export const cancelBookingController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId || Array.isArray(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Missing booking ID",
      });
    }
    const result = await cancelBookingService({
      bookingId,
      userId: req.user!.id,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
