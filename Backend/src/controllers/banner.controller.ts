import { Request, Response } from "express";
import {
  createBannerService,
  deleteBannerService,
  getAllBannerService,
  getBannerById,
  updateBannerService,
} from "../services/banner.service";
import { errorHandler } from "../utils/errorHandler";
export const createBannerController = async (req: Request, res: Response) => {
  try {
    const banner = await createBannerService(req.body);

    return res.status(201).json({
      success: true,
      message: "Create banner successfully",
      data: banner,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch banner",
    });
  }
};

export const getAllBannerController = async (req: Request, res: Response) => {
  try {
    const banners = await getAllBannerService();

    return res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch banner",
    });
  }
};

export const getBannerByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const banner = await getBannerById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch banner",
    });
  }
};

export const updateBannerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const banner = await updateBannerService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Update banner successfully",
      data: banner,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch banner",
    });
  }
};

export const deleteBannerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    await deleteBannerService(id);

    return res.status(200).json({
      success: true,
      message: "Delete banner successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch banner",
    });
  }
};
