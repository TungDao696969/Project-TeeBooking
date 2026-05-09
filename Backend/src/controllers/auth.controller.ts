import type { Request, Response } from "express";
import { ZodError } from "zod";
import {
  changePasswordService,
  forgotPasswordService,
  loginUserService,
  registerUserService,
  resetPasswordService,
} from "../services/auth.service";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { errorHandler } from "../utils/errorHandler";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validateData = registerSchema.parse(req.body);

    // Service hiện tại trả về email, không còn user
    const result = await registerUserService(validateData);

    res.status(201).json({
      success: true,
      message:
        "Registration initiated successfully. Please verify your email with OTP.",
      data: {
        email: result.email,
      },
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Registration failed",
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate dữ liệu đầu vào
    const validateData = loginSchema.parse(req.body);

    // Login service
    const { user, accessToken, refreshToken } =
      await loginUserService(validateData);

    /**
     * Access Token Cookie
     * - Sống ngắn
     * - Dùng authenticate request
     */
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 phút
    });

    /**
     * Refresh Token Cookie
     * - Sống dài
     * - Redis quản lý
     */
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error: unknown) {
    errorHandler({
      error,
      res,
      defaultMessage: "Login failed",
    });
  }
};

export const logoutController = async (_req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.clearCookie("access_token", cookieOptions);
  res.clearCookie("refresh_token", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await forgotPasswordService(email);

    return res.status(200).json({
      success: true,
      message: "Reset OTP sent to email",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    await resetPasswordService(email, otp, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePasswordController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(req.user!.id, currentPassword, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
