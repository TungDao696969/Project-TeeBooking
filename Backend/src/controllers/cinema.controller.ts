import { Request, Response, NextFunction } from "express";
import * as cinemaService from "../services/cinema.service";
import { getCinemaService } from "../services/cinema.service";
import { errorHandler } from "../utils/errorHandler";
export const createCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cinema = await cinemaService.createCinemaService(req.body);

    res.status(201).json({
      success: true,
      message: "Cinema created successfully",
      data: cinema,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getAllCinemas = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const cinemas = await cinemaService.getCinemaService(page, limit);

    res.status(200).json({
      success: true,
      ...cinemas,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// export const getCinemaBySlug = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { slug } = req.params;
//     if (!slug || Array.isArray(slug)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invaid cinema Id",
//       });
//     }
//     const cinema = await cinemaService.getCinemaBySlugService(slug);

//     res.status(200).json({
//       success: true,
//       data: cinema,
//     });
//   } catch (error) {
//     errorHandler({
//       error,
//       res,
//       defaultMessage: "Failed to fetch cinema",
//     });
//   }
// };

export const getCinemaById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema Id",
      });
    }
    const cinema = await cinemaService.getCinemaByIdService(id);

    res.status(200).json({
      success: true,
      data: cinema,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const updateCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema Id",
      });
    }
    const cinema = await cinemaService.updateCinemaService(id, req.body);

    res.status(200).json({
      success: true,
      message: "Cinema updated successfully",
      data: cinema,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const deleteCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema Id",
      });
    }

    await cinemaService.deleteCinemaService(id);

    res.status(200).json({
      success: true,
      message: "Cinema deleted successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getCinemaShowtimes = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema showtime slug",
      });
    }
    const data = await cinemaService.getCinemaShowtimesService(slug);

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema showtimes",
    });
  }
};
