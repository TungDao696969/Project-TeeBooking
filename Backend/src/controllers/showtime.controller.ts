import { Request, Response } from "express";
import {
  createShowtimeService,
  getShowtimeByIdService,
  updateShowtimeService,
  deleteShowtimeService,
  getAllShowtimesService,
  getShowtimeTicketTypesService,
} from "../services/showtime.service";
import { errorHandler } from "../utils/errorHandler";
export const createShowtime = async (req: Request, res: Response) => {
  try {
    const showtime = await createShowtimeService(req.body);

    return res.status(201).json({
      success: true,
      data: showtime,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getAllShowtimes = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getAllShowtimesService(page, limit);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch showtimes",
    });
  }
};

export const getShowtimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const showtime = await getShowtimeByIdService(id);

    if (!showtime) {
      return res.status(404).json({
        success: false,
        message: "Showtime not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: showtime,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const updateShowtime = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const updated = await updateShowtimeService(id, req.body);

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const deleteShowtime = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    await deleteShowtimeService(id);

    return res.status(200).json({
      success: true,
      message: "Showtime deleted successfully",
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getShowtimeTicketTypes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Showtime ID is required",
      });
    }

    const result = await getShowtimeTicketTypesService(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch ticket types",
    });
  }
};
