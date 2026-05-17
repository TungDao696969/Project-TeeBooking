import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getCurrentBookingService } from "../services/booking-current.service";

export const getCurrentBookingController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const booking = await getCurrentBookingService(req.user!.id);

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
