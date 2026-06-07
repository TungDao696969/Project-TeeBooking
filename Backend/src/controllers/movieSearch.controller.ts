import { Request, Response } from "express";
import {
  getMovieSuggestionsService,
  searchMoviesService,
} from "../services/movieSearch.service";
import { success } from "zod";
import { errorHandler } from "../utils/errorHandler";
export const searchMoviesController = async (req: Request, res: Response) => {
  try {
    const result = await searchMoviesService({
      q: req.query.q as string,
      genre: req.query.genre as string,
      status: req.query.status as string,
      sort: req.query.sort as string,

      page: req.query.page ? Number(req.query.page) : 1,

      limit: req.query.limit ? Number(req.query.limit) : 10,

      year: req.query.year ? Number(req.query.year) : undefined,

      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};

export const getMovieSuggestions = async (req: Request, res: Response) => {
  try {
    const q = req.query.q?.toString() || "";

    const result = await getMovieSuggestionsService(q);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch suggestions",
    });
  }
};
