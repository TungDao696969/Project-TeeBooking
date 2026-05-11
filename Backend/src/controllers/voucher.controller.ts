import { Request, Response } from "express";
import {
  createVoucherService,
  getAllVouchersService,
  getVoucherByIdService,
  updateVoucherService,
  deleteVoucherService,
} from "../services/voucher.service";
import {
  createVoucherSchema,
  updateVoucherSchema,
} from "../validations/voucher.schema";
import { errorHandler } from "../utils/errorHandler";

export const createVoucherController = async (req: Request, res: Response) => {
  try {
    const validatedData = createVoucherSchema.parse(req.body);

    const voucher = await createVoucherService(validatedData);

    return res.status(201).json({
      success: true,
      data: voucher,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to create voucher" });
  }
};
export const getAllVouchersController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const vouchers = await getAllVouchersService();

    return res.status(200).json({
      success: true,
      data: vouchers,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to fetch vouchers" });
  }
};

export const getVoucherByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid voucher id",
      });
    }

    const voucher = await getVoucherByIdService(id);

    return res.status(200).json({
      success: true,
      data: voucher,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to fetch voucher" });
  }
};

export const updateVoucherController = async (req: Request, res: Response) => {
  try {
    const validatedData = updateVoucherSchema.parse(req.body);
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid voucher id",
      });
    }
    const voucher = await updateVoucherService(id, validatedData);

    return res.status(200).json({
      success: true,
      data: voucher,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to update voucher" });
  }
};

export const deleteVoucherController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid voucher id",
      });
    }
    await deleteVoucherService(id);

    return res.status(200).json({
      success: true,
      message: "Voucher deleted successfully",
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to delete voucher" });
  }
};
