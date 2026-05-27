import { email } from "zod";
import { generateOtp } from "../utils/generateOtp";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { sendMail, sendMailTemplate } from "../utils/mail";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

import { LoginInput, RegisterInput } from "../validations/auth.validation";
import bcrypt from "bcryptjs";

export const registerUserService = async (data: RegisterInput) => {
  // Kiểm tra email hoặc phone đã tồn tại
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { phone: data.phone }],
    },
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      throw new Error("Email already exists");
    }
    throw new Error("Phone already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Generate OTP
  const otp = generateOtp();

  /**
   * Không tạo user thật ngay trong DB
   * Lưu tạm vào Redis để xác thực OTP trước
   */
  const registerData = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    passwordHash: hashedPassword,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    role: "customer",
    otp,
  };

  // Redis key chuẩn
  await redis.set(
    `register:${data.email}`,
    JSON.stringify(registerData),
    "EX",
    300, // 5 phút
  );

  // Gửi mail xác thực
  const mailInfo = await sendMailTemplate(
    data.email,
    "Verify your account",
    "verify-email",
    {
      fullName: data.fullName,
      email: data.email,
      otp,
    },
  );

  // Nếu gửi mail lỗi thì xóa Redis
  if (!mailInfo) {
    await redis.del(`register:${data.email}`);
    throw new Error("Failed to send verification email");
  }

  return {
    fullname: data.fullName,
    email: data.email,
    gender: data.gender,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth,
  };
};

export const loginUserService = async (data: LoginInput) => {
  // Tìm user theo email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Kiểm tra trạng thái tài khoản
  if (!user.isActive) {
    throw new Error("Account is disabled");
  }

  // Kiểm tra mật khẩu
  const isPasswordValid = await comparePassword(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Kiểm tra xác thực email
  if (!user.isVerified) {
    throw new Error("Please verify your email before logging in");
  }

  /**
   * Tạo access token + refresh token
   */
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  /**
   * Redis lưu refresh token
   * Key:
   * refresh:userId
   *
   * TTL:
   * 7 ngày (hoặc theo thời gian refresh token)
   */
  await redis.set(`refresh:${user.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatarUrl: user.avatarUrl,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      isVerified: user.isVerified,
      isActive: user.isActive,
    },
    accessToken,
    refreshToken,
  };
};

// forgotPassword

export const forgotPasswordService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Email not found");
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút

  // Lưu OTP vào database
  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordCode: otp,
      resetPasswordExpiresAt: expiresAt,
    },
  });

  await redis.set(`forgot:${email}`, otp, "EX", 300);

  const mailInfo = await sendMailTemplate(
    email,
    "Reset Password OTP",
    "forgot-password",
    {
      fullName: user.fullName,
      otp,
    },
  );

  if (!mailInfo) {
    await redis.del(`forgot:${email}`);
    // Xóa OTP khỏi database nếu gửi mail thất bại
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordCode: null,
        resetPasswordExpiresAt: null,
      },
    });
    throw new Error("Failed to send reset email");
  }
  return true;
};

export const resetPasswordService = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (
    !user ||
    user.resetPasswordCode !== otp ||
    !user.resetPasswordExpiresAt ||
    user.resetPasswordExpiresAt < new Date()
  ) {
    throw new Error("Invalid or expired OTP");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      passwordHash: hashedPassword,
      resetPasswordCode: null,
      resetPasswordExpiresAt: null,
    },
  });

  await redis.del(`forgot:${email}`);

  if (user) {
    await redis.del(`refresh:${user.id}`);
  }

  return true;
};

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isMatch) {
    throw new Error("Current password incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: hashedPassword,
    },
  });

  /**
   * Xóa refresh token
   * Bắt login lại
   */
  await redis.del(`refresh:${user.id}`);

  return true;
};
