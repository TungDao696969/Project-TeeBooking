import { Request, Response } from "express";
import {
  confirmBookingSeatService,
  releaseSeatService,
  reservaSeatService,
} from "../services/showtimeSeat.service";
import { errorHandler } from "../utils/errorHandler";

export const reserveShowtimeSeatController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid showtime seat ID",
      });
    }

    const seat = await reservaSeatService(id);

    return res.status(200).json({
      success: true,
      data: seat,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to reserve showtime seat",
    });
  }
};

export const releaseShowtimeSeatController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid showtime seat ID",
      });
    }

    const seat = await releaseSeatService(id);

    return res.status(200).json({
      success: true,
      data: seat,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to release showtime seat",
    });
  }
};

export const confirmBookingShowtimeSeatController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid showtime seat ID",
      });
    }

    const seat = await confirmBookingSeatService(id);

    return res.status(200).json({
      success: true,
      data: seat,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to confirm showtime seat booking",
    });
  }
};
