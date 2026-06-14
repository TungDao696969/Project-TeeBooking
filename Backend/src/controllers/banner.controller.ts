import { Request, Response } from "express";
import {
  createBannerService,
  deleteBannerService,
  getAllBannerService,
  getAllBannersAdminService,
  getBannerById,
  updateBannerService,
} from "../services/banner.service";
import { errorHandler } from "../utils/errorHandler";
import { createBannerSchema, updateBannerSchema } from "../validations/banner.validation";
import { uploadToCloudinary } from "../configs/upload-cloudinary";
export const createBannerController = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const validateData = createBannerSchema.parse(req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      "booking/banners",
    );

    const banner = await createBannerService({
      title: validateData.title,
      redirectUrl: validateData.redirectUrl || "",
      startDate: new Date(validateData.startDate),
      endDate: new Date(validateData.endDate),
      isActive: validateData.isActive ?? true,
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Create banner successfully",
      data: banner,
    });
  } catch (error) {
    console.log(error);

    errorHandler({
      error,
      res,
      defaultMessage: "Failed to create banner",
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

export const getAllBannersAdminController = async (req: Request, res: Response) => {
  try {
    const banners = await getAllBannersAdminService();

    return res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch banners",
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
        message: "Invalid banner ID",
      });
    }

    const validateData = updateBannerSchema.parse(req.body);

    // If a new image is uploaded, upload to Cloudinary
    let imageUrl: string | undefined = undefined;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, "booking/banners");
    }

    const updateData: Record<string, unknown> = { ...validateData };
    if (validateData.startDate) updateData.startDate = new Date(validateData.startDate);
    if (validateData.endDate) updateData.endDate = new Date(validateData.endDate);
    if (imageUrl) updateData.imageUrl = imageUrl;

    const banner = await updateBannerService(id, updateData);

    return res.status(200).json({
      success: true,
      message: "Update banner successfully",
      data: banner,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update banner",
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
