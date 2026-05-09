import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import {
  createAddressService,
  getAddressByIdService,
  getAddressesService,
  updateAddressService,
  deleteAddressService,
  setDefaultAddressService,
} from "../services/address.service";
import {
  createAddressSchema,
  UpdateAddressInput,
  updateAddressSchema,
} from "../validations/address.schema";
import { errorHandler } from "../utils/errorHandler";

export const createAddressController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const validateData = createAddressSchema.parse(req.body);

    const address = await createAddressService(req.user.id, validateData);

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to create address",
    });
  }
};

export const getAddressController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const address = await getAddressesService(req.user.id);

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to get addresses",
    });
  }
};

export const getAddressByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const { addressId } = req.params;

    if (!addressId || Array.isArray(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }

    const address = await getAddressByIdService(req.user.id, addressId);
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to get address",
    });
  }
};

export const updateUserAddress = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const validateData = updateAddressSchema.parse(req.body);
    const { addressId } = req.params;
    if (!addressId || Array.isArray(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    const updateAddress = await updateAddressService(
      req.user.id,
      addressId,
      validateData,
    );
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updateAddress,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update address",
    });
  }
};

export const deleteAddressController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const { addressId } = req.params;
    if (!addressId || Array.isArray(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    await deleteAddressService(req.user.id, addressId);

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete address",
    });
  }
};

export const setDefaultAddressController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const { addressId } = req.params;
    if (!addressId || Array.isArray(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    await setDefaultAddressService(req.user.id, addressId);

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to set default address",
    });
  }
};
