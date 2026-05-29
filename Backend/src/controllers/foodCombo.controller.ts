import { Request, Response } from "express";
import cloudinary from "../configs/cloudinary";
import {
  createFoodComboService,
  deleteFoodComboService,
  getAllFoodCombosService,
  getFoodComboByIdService,
  updateFoodComboService,
} from "../services/foodCombo.service";

export const getAllFoodCombosController = async (
  req: Request,
  res: Response,
) => {
  const combos = await getAllFoodCombosService();

  return res.status(200).json({
    success: true,
    data: combos,
  });
};

export const getFoodComboByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Movie slug is required",
    });
  }
  const combo = await getFoodComboByIdService(id);

  if (!combo) {
    return res.status(404).json({
      success: false,
      message: "Food combo not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: combo,
  });
};

export const createFoodComboController = async (
  req: Request,
  res: Response,
) => {
  let imageUrl = null;

  if (req.file) {
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-combos",
    });

    imageUrl = uploaded.secure_url;
  }

  const combo = await createFoodComboService({
    ...req.body,
    price: Number(req.body.price),
    stockQuantity: Number(req.body.stockQuantity),
    imageUrl,
  });

  return res.status(201).json({
    success: true,
    message: "Create combo successfully",
    data: combo,
  });
};

export const updateFoodComboController = async (
  req: Request,
  res: Response,
) => {
  let imageUrl;

  if (req.file) {
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-combos",
    });

    imageUrl = uploaded.secure_url;
  }

  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Movie slug is required",
    });
  }

  const combo = await updateFoodComboService(id, {
    ...req.body,
    ...(imageUrl && { imageUrl }),
  });

  return res.status(200).json({
    success: true,
    message: "Update combo successfully",
    data: combo,
  });
};

export const deleteFoodComboController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Movie slug is required",
    });
  }
  await deleteFoodComboService(id);

  return res.status(200).json({
    success: true,
    message: "Delete combo successfully",
  });
};
