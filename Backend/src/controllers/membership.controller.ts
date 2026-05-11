import { AuthRequest } from "../middlewares/auth.middleware";
import type { Response } from "express";
import { getMembershipService } from "../services/membership.service";
import { errorHandler } from "../utils/errorHandler";
import {
  createMembershipService,
  updateMembershipService,
  deleteMembershipService,
} from "../services/membership.service";
import { updateMembershipSchema } from "../validations/membership.schema";
export const getMembershipController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const membership = await getMembershipService(req.user!.id);

    return res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to get membership" });
  }
};

export const createMembershipController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const membership = await createMembershipService(req.user!.id);

    return res.status(201).json({
      success: true,
      data: membership,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to create membership" });
  }
};

export const updateMembershipController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const validatedData = updateMembershipSchema.parse(req.body);

    const membership = await updateMembershipService(
      req.user!.id,
      validatedData,
    );

    return res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to update membership" });
  }
};

export const deleteMembershipController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    await deleteMembershipService(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Membership deleted successfully",
    });
  } catch (error) {
    errorHandler({ error, res, defaultMessage: "Failed to delete membership" });
  }
};
