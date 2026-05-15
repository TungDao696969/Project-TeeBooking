import { Request, Response } from "express";
import {
  createCityService,
  deleteCityService,
  getCitiesService,
  getCityByIdService,
  updateCityService,
} from "../services/city.service";
import { errorHandler } from "../utils/errorHandler";
import { success } from "zod";
export const createCityController = async (req: Request, res: Response) => {
  try {
    const result = await createCityService(req.body);

    return res.status(201).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};

export const getCitiesController = async (req: Request, res: Response) => {
  try {
    const result = await getCitiesService();

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};

export const getCityByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: true,
        message: "Invaid Id fail",
      });
    }
    const result = await getCityByIdService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};

export const updateCityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: true,
        message: "Invaid Id fail",
      });
    }
    const result = await updateCityService(id, req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};

export const deleteCityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: true,
        message: "Invaid Id fail",
      });
    }
    const result = await deleteCityService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch movies list",
    });
  }
};
