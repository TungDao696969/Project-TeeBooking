import { Request, Response } from "express";
import {
  createTrailerService,
  deleteTrailerService,
  getTrailerByIdService,
  getTrailerByMovieService,
  updateTrailerService,
} from "../services/trailer.service";
import { errorHandler } from "../utils/errorHandler";
export const createTrailerController = async (req: Request, res: Response) => {
  try {
    const result = await createTrailerService(req.body);

    return res.status(201).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getTrailersByMovieController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { movieId } = req.params;
    if (!movieId || Array.isArray(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid id fail",
      });
    }
    const result = await getTrailerByMovieService(movieId);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getTrailerByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid id fail",
      });
    }

    const result = await getTrailerByIdService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const updateTrailerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid id fail",
      });
    }

    const result = await updateTrailerService(id, req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const deleteTrailerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid id fail",
      });
    }

    const result = await deleteTrailerService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};
