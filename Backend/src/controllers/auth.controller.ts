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
import { hashPassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

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

export const googleRedirect = (req: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: "code",
    scope: "email profile",
    access_type: "offline",
  };
  const urlRedirect = `${url}?${new URLSearchParams(params as unknown as URLSearchParams).toString()}`;
  res.redirect(urlRedirect);
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    // code nằm ở query
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({
        message: "Missing code",
      });
    }

    // đổi code lấy access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    if (!access_token) {
      return res.status(400).json({
        message: "Google access token missing",
      });
    }

    // lấy thông tin user
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const userGoogle = await userResponse.json();

    if (!userGoogle.email) {
      return res.status(400).json({
        message: "Google email missing",
      });
    }

    const fullName = userGoogle.name || userGoogle.email.split("@")[0];
    const avatarUrl = userGoogle.picture || null;

    let user = await prisma.user.findUnique({
      where: { email: userGoogle.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          fullName,
          email: userGoogle.email,
          phone: `google-${userGoogle.id}`,
          passwordHash: await hashPassword(`google:${userGoogle.id}`),
          avatarUrl,
          isVerified: true,
          role: "customer",
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          fullName: user.fullName || fullName,
          avatarUrl: user.avatarUrl || avatarUrl,
          isVerified: true,
        },
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await redis.set(`refresh:${user.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const params = new URLSearchParams({
      token: accessToken,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });

    if (user.avatarUrl) {
      params.set("avatarUrl", user.avatarUrl);
    }

    res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?${params}`);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Google login failed",
    });
  }
};
