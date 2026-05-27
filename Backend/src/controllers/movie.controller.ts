import { Request, Response } from "express";
import * as movieService from "../services/movie.service";
import { success } from "zod";
import { createMovieSchema } from "../validations/movie.validation";

export const createMovie = async (req: Request, res: Response) => {
  const validateData = createMovieSchema.parse(req.body);
  const movie = await movieService.createMovieService(validateData);

  return res.status(201).json({
    success: true,
    data: movie,
  });
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

// export const getMovieById = async (req: Request, res: Response) => {
//   const { slug } = req.params;
//   if (!slug || Array.isArray(slug)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invaid movie Id",
//     });
//   }
//   const movie = await movieService.getMovieByIdService(slug);

//   return res.json({
//     success: true,
//     data: movie,
//   });
// };

export const updateMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  if (!movieId || Array.isArray(movieId)) {
    return res.status(400).json({
      success: false,
      message: "Invaid movie Id",
    });
  }
  const validateData = createMovieSchema.parse(req.body);

  const movie = await movieService.updateMovieService(movieId, validateData);

  return res.json({
    success: true,
    data: movie,
  });
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  if (!movieId || Array.isArray(movieId)) {
    return res.status(400).json({
      success: false,
      message: "Invaid movie Id",
    });
  }
  await movieService.deleteMovieService(movieId);

  return res.json({
    success: true,
    message: "Delete success",
  });
};
