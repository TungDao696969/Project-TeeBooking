import { Request, Response } from "express";

import { getShowtimeSeatsService } from "../services/get-showtime-seats.service";

import { errorHandler } from "../utils/errorHandler";

export const getShowtimeSeatsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Showtime ID is required",
      });
    }

    const data = await getShowtimeSeatsService(id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch showtime seats",
    });
  }
};
