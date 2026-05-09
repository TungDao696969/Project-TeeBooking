import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const verifyEmailController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.verificationCode !== otp) {
      res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
      return;
    }

    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

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
