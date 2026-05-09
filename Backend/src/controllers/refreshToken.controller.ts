import type { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { prisma } from "../utils/prisma";

type RequestWithCookies = Request & {
  cookies?: {
    refresh_token?: string;
  };
};

export const refreshTokenController = async (
  req: RequestWithCookies,
  res: Response,
) => {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET is missing");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as
      | JwtPayload
      | string;

    if (typeof decoded === "string" || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user || !user.isActive || !user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Refresh token invalid",
      });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch {
    return res.status(401).json({
      success: false,
      message: "Refresh token expired or invalid",
    });
  }
};
