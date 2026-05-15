import { AuthRequest } from "../middlewares/auth.middleware";
import { Response, Request } from "express";
import {
  createReviewService,
  updateReviewService,
  deleteReviewService,
  getReviewService,
} from "../services/review.service";
import { success } from "zod";
import { errorHandler } from "../utils/errorHandler";
import { fa } from "zod/v4/locales";
export const createReviewController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const result = await createReviewService(req.user!.id, req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

export const updateReviewController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid id fail",
      });
    }
    const result = await updateReviewService(req.user!.id, id, req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

export const deleteReviewController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid id fail",
      });
    }
    const result = await deleteReviewService(req.user!.id, id);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

export const getMovieReviewsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { movieId } = req.params;
    if (!movieId || Array.isArray(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid Id fail",
      });
    }
    const result = await getReviewService(movieId, page, limit);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
