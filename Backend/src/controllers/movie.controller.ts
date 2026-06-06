import { Request, Response } from "express";
import * as movieService from "../services/movie.service";
import {
  createMovieSchema,
  updateMovieSchema,
} from "../validations/movie.validation";
import { errorHandler } from "../utils/errorHandler";
import { uploadToCloudinary } from "../configs/upload-cloudinary";

export const createMovie = async (req: Request, res: Response) => {
  try {
    const validateData = createMovieSchema.parse(req.body);

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const poster = files?.poster?.[0];

    const banner = files?.banner?.[0];

    const [posterUrl, bannerUrl] = await Promise.all([
      poster
        ? uploadToCloudinary(poster.buffer, "booking/movies/posters")
        : Promise.resolve(undefined),
      banner
        ? uploadToCloudinary(banner.buffer, "booking/movies/banners")
        : Promise.resolve(undefined),
    ]);

    const movie = await movieService.createMovieService({
      ...validateData,

      posterUrl,

      bannerUrl,
    });

    return res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to create movie",
    });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string;

  const movies = await movieService.getMoviesService(page, limit, search);

  return res.json({
    success: true,
    ...movies,
  });
};

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid movie Id",
    });
  }

  const movie = await movieService.getMovieByIdService(id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  return res.json({
    success: true,
    data: movie,
  });
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie Id",
      });
    }

    const validateData = updateMovieSchema.parse(req.body);

    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const poster = files?.poster?.[0];

    const banner = files?.banner?.[0];

    const [posterUrl, bannerUrl] = await Promise.all([
      poster
        ? uploadToCloudinary(poster.buffer, "booking/movies/posters")
        : Promise.resolve(undefined),
      banner
        ? uploadToCloudinary(banner.buffer, "booking/movies/banners")
        : Promise.resolve(undefined),
    ]);

    const movie = await movieService.updateMovieService(id, {
      ...validateData,
      ...(posterUrl && { posterUrl }),
      ...(bannerUrl && { bannerUrl }),
    });

    return res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update movie",
    });
  }
};

export const getMovieShowtimes = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        message: "Movie slug is required",
      });
    }

    const result = await movieService.getMovieShowtimesService(slug);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movie showtimes",
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie Id",
      });
    }

    await movieService.deleteMovieService(id);

    return res.status(200).json({
      success: true,
      message: "Movie moved to trash successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete movie",
    });
  }
};

export const getTrashMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getTrashMoviesService();

    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch trash movies",
    });
  }
};

export const restoreMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie Id",
      });
    }

    await movieService.restoreMovieService(id);

    return res.status(200).json({
      success: true,
      message: "Movie restored successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to restore movie",
    });
  }
};
