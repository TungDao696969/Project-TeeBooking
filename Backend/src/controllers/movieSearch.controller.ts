import { Request, Response } from "express";
import { searchMoviesService } from "../services/movieSearch.service";
import { success } from "zod";
import { errorHandler } from "../utils/errorHandler";
export const searchMoviesController = async (req: Request, res: Response) => {
  try {
    const result = await searchMoviesService(req.query);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};
