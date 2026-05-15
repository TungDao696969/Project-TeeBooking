import { Request, Response } from "express";
import { getMovieDetailService } from "../services/movieSlug.service";

export const getMovieDetailController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }
    const result = await getMovieDetailService(slug);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
