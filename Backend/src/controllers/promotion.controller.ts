import { Request, Response } from "express";

import {
  createPromotionService,
  deletePromotionService,
  getActivePromotionService,
  getAllPromotionService,
  getPromotionByIdService,
  updatePromotionService,
} from "../services/promotion.service";

import {
  createPromotionSchema,
  updatePromotionSchema,
} from "../validations/promotion.validation";

export const createPromotionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const body = createPromotionSchema.parse(req.body);

    const promotion = await createPromotionService({
      ...body,

      startDate: new Date(body.startDate),

      endDate: new Date(body.endDate),
    });

    return res.status(201).json({
      success: true,

      message: "Create promotion successfully",

      data: promotion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
};

export const getAllPromotionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page || 1);

    const limit = Number(req.query.limit || 10);

    const promotions = await getAllPromotionService(page, limit);

    return res.json({
      success: true,

      ...promotions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
};

export const getPromotionByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const promotion = await getPromotionByIdService(id);

    if (!promotion) {
      return res.status(404).json({
        success: false,

        message: "Promotion not found",
      });
    }

    return res.json({
      success: true,

      data: promotion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
};

export const updatePromotionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const body = updatePromotionSchema.parse(req.body);
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const updateData = {
      ...req.body,
      startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
      endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
    };

    const promotion = await updatePromotionService(id, updateData);

    return res.json({
      success: true,

      message: "Update promotion successfully",

      data: promotion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
};

export const deletePromotionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    await deletePromotionService(id);

    return res.json({
      success: true,

      message: "Delete promotion successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
};

export const getActivePromotionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const promotions = await getActivePromotionService();

    return res.json({
      success: true,

      data: promotions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
};
