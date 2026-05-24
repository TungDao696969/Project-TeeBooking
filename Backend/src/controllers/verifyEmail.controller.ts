import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

type RegisterCacheData = {
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  otp: string;
};

export const verifyEmailController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
      return;
    }

    const redisKey = `register:${email}`;
    const cachedRegisterData = await redis.get(redisKey);

    if (!cachedRegisterData) {
      res.status(400).json({
        success: false,
        message: "OTP không hợp lệ hoặc đã hết hạn",
      });
      return;
    }

    const registerData = JSON.parse(cachedRegisterData) as RegisterCacheData;

    if (registerData.otp !== otp) {
      res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      await redis.del(redisKey);
      res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
      return;
    }

    await prisma.user.create({
      data: {
        fullName: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        passwordHash: registerData.passwordHash,
        gender: registerData.gender as "male" | "female",
        dateOfBirth: new Date(registerData.dateOfBirth),
        role: registerData.role as "customer",
        isVerified: true,
      },
    });

    await redis.del(redisKey);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Email verification failed";

    res.status(500).json({
      success: false,
      message,
    });
  }
};
