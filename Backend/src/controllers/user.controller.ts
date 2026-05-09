import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { getUserProfileService } from "../services/user.service";
import { errorHandler } from "../utils/errorHandler";
import { updateProfileSchema } from "../validations/user.schema";
import { updateUserProfileService } from "../services/user.service";
import { uploadAvatarService } from "../services/user.service";
export const getUserProfileController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const profile = await getUserProfileService(req.user.id);

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: profile,
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch user profile",
    });
  }
};

export const updateUserController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const validatedData = updateProfileSchema.parse(req.body);

    const updatedUser = await updateUserProfileService(
      req.user.id,
      validatedData,
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update profile",
    });
  }
};

export const uploadAvatarController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const updatedUser = await uploadAvatarService(req.user.id, req.file);

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: updatedUser,
    });
  } catch (error: unknown) {
    console.error("Upload avatar error:", error);
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to upload avatar",
    });
  }
};
