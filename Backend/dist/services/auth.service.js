"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = exports.resetPasswordService = exports.forgotPasswordService = exports.loginUserService = exports.registerUserService = void 0;
const generateOtp_1 = require("../utils/generateOtp");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const mail_1 = require("../utils/mail");
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUserService = async (data) => {
    // Kiểm tra email hoặc phone đã tồn tại
    const existingUser = await prisma_1.prisma.user.findFirst({
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
    const hashedPassword = await (0, hash_1.hashPassword)(data.password);
    // Generate OTP
    const otp = (0, generateOtp_1.generateOtp)();
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
    await redis_1.redis.set(`register:${data.email}`, JSON.stringify(registerData), "EX", 300);
    // Gửi mail xác thực
    const mailInfo = await (0, mail_1.sendMailTemplate)(data.email, "Verify your account", "verify-email", {
        fullName: data.fullName,
        email: data.email,
        otp,
    });
    // Nếu gửi mail lỗi thì xóa Redis
    if (!mailInfo) {
        await redis_1.redis.del(`register:${data.email}`);
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
exports.registerUserService = registerUserService;
const loginUserService = async (data) => {
    // Tìm user theo email
    const user = await prisma_1.prisma.user.findUnique({
        where: { email: data.email, deletedAt: null },
    });
    console.log("USER:", user);
    if (!user) {
        throw new Error("Account not found");
    }
    if (!user) {
        throw new Error("Invalid credentials");
    }
    // Kiểm tra trạng thái tài khoản
    if (!user.isActive) {
        throw new Error("Account is disabled");
    }
    // Kiểm tra mật khẩu
    const isPasswordValid = await (0, hash_1.comparePassword)(data.password, user.passwordHash);
    console.log("PASSWORD VALID:", isPasswordValid);
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
    const accessToken = (0, jwt_1.generateAccessToken)(user.id);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
    /**
     * Redis lưu refresh token
     * Key:
     * refresh:userId
     *
     * TTL:
     * 7 ngày (hoặc theo thời gian refresh token)
     */
    await redis_1.redis.set(`refresh:${user.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
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
exports.loginUserService = loginUserService;
// forgotPassword
const forgotPasswordService = async (email) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("Email not found");
    }
    const otp = (0, generateOtp_1.generateOtp)();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
    // Lưu OTP vào database
    await prisma_1.prisma.user.update({
        where: { email },
        data: {
            resetPasswordCode: otp,
            resetPasswordExpiresAt: expiresAt,
        },
    });
    await redis_1.redis.set(`forgot:${email}`, otp, "EX", 300);
    const mailInfo = await (0, mail_1.sendMailTemplate)(email, "Reset Password OTP", "forgot-password", {
        fullName: user.fullName,
        otp,
    });
    if (!mailInfo) {
        await redis_1.redis.del(`forgot:${email}`);
        // Xóa OTP khỏi database nếu gửi mail thất bại
        await prisma_1.prisma.user.update({
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
exports.forgotPasswordService = forgotPasswordService;
const resetPasswordService = async (email, otp, newPassword) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user ||
        user.resetPasswordCode !== otp ||
        !user.resetPasswordExpiresAt ||
        user.resetPasswordExpiresAt < new Date()) {
        throw new Error("Invalid or expired OTP");
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    await prisma_1.prisma.user.update({
        where: { email },
        data: {
            passwordHash: hashedPassword,
            resetPasswordCode: null,
            resetPasswordExpiresAt: null,
        },
    });
    await redis_1.redis.del(`forgot:${email}`);
    if (user) {
        await redis_1.redis.del(`refresh:${user.id}`);
    }
    return true;
};
exports.resetPasswordService = resetPasswordService;
const changePasswordService = async (userId, currentPassword, newPassword) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcryptjs_1.default.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
        throw new Error("Current password incorrect");
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            passwordHash: hashedPassword,
        },
    });
    /**
     * Xóa refresh token
     * Bắt login lại
     */
    await redis_1.redis.del(`refresh:${user.id}`);
    return true;
};
exports.changePasswordService = changePasswordService;
//# sourceMappingURL=auth.service.js.map