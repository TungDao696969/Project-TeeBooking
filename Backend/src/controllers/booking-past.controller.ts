import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getBookingHistoryDetail,
  getPastBookingsService,
} from "../services/booking-past.service";

export const getPastBookingsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await getPastBookingsService({
      userId: req.user!.id,
      page,
      limit,
      status: req.query.status as string,
      search: req.query.search as string,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingHistoryDetailController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId || Array.isArray(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await getBookingHistoryDetail(bookingId, req.user!.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

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
