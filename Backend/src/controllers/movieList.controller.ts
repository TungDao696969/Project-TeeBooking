import { Request, Response } from "express";
import { getMoviesListService } from "../services/movieList.service";
import { errorHandler } from "../utils/errorHandler";
export const getMoviesListController = async (req: Request, res: Response) => {
  try {
    const result = await getMoviesListService(req.query);
    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};
