import { Request, Response, NextFunction } from "express";
import * as cinemaService from "../services/cinema.service";
import { getCinemaService } from "../services/cinema.service";
import { success } from "zod";
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
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cinemas = await cinemaService.getCinemaService();

    res.status(200).json({
      success: true,
      data: cinemas,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

export const getCinemaById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cinemaId } = req.params;
    if (!cinemaId || Array.isArray(cinemaId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema Id",
      });
    }
    const cinema = await cinemaService.getCinemaByIdService(cinemaId);

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
    const { cinemaId } = req.params;
    if (!cinemaId || Array.isArray(cinemaId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema Id",
      });
    }
    const cinema = await cinemaService.updateCinemaService(cinemaId, req.body);

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
    const { cinemaId } = req.params;

    if (!cinemaId || Array.isArray(cinemaId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid cinema Id",
      });
    }

    await cinemaService.deleteCinemaService(cinemaId);

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
