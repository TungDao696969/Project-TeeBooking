"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.googleRedirect = exports.changePasswordController = exports.resetPasswordController = exports.forgotPasswordController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validation_1 = require("../validations/auth.validation");
const errorHandler_1 = require("../utils/errorHandler");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const registerController = async (req, res) => {
    try {
        const validateData = auth_validation_1.registerSchema.parse(req.body);
        // Service hiện tại trả về email, không còn user
        const result = await (0, auth_service_1.registerUserService)(validateData);
        res.status(201).json({
            success: true,
            message: "Registration initiated successfully. Please verify your email with OTP.",
            data: {
                email: result.email,
            },
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Registration failed",
        });
    }
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    try {
        // Validate dữ liệu đầu vào
        const validateData = auth_validation_1.loginSchema.parse(req.body);
        // Login service
        const { user, accessToken, refreshToken } = await (0, auth_service_1.loginUserService)(validateData);
        /**
         * Access Token Cookie
         * - Sống ngắn
         * - Dùng authenticate request
         */
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
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
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                accessToken,
            },
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Login failed",
        });
    }
};
exports.loginController = loginController;
const logoutController = async (_req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
exports.logoutController = logoutController;
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        await (0, auth_service_1.forgotPasswordService)(email);
        return res.status(200).json({
            success: true,
            message: "Reset OTP sent to email",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.forgotPasswordController = forgotPasswordController;
const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        await (0, auth_service_1.resetPasswordService)(email, otp, password);
        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.resetPasswordController = resetPasswordController;
const changePasswordController = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        await (0, auth_service_1.changePasswordService)(req.user.id, currentPassword, newPassword);
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.changePasswordController = changePasswordController;
const googleRedirect = (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth`;
    const params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        response_type: "code",
        scope: "email profile",
        access_type: "offline",
    };
    const urlRedirect = `${url}?${new URLSearchParams(params).toString()}`;
    res.redirect(urlRedirect);
};
exports.googleRedirect = googleRedirect;
const googleCallback = async (req, res) => {
    try {
        // code nằm ở query
        const code = req.query.code;
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
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL,
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
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userGoogle = await userResponse.json();
        if (!userGoogle.email) {
            return res.status(400).json({
                message: "Google email missing",
            });
        }
        const fullName = userGoogle.name || userGoogle.email.split("@")[0];
        const avatarUrl = userGoogle.picture || null;
        let user = await prisma_1.prisma.user.findUnique({
            where: { email: userGoogle.email },
        });
        if (!user) {
            user = await prisma_1.prisma.user.create({
                data: {
                    fullName,
                    email: userGoogle.email,
                    phone: `google-${userGoogle.id}`,
                    passwordHash: await (0, hash_1.hashPassword)(`google:${userGoogle.id}`),
                    avatarUrl,
                    isVerified: true,
                    role: "customer",
                },
            });
        }
        else {
            user = await prisma_1.prisma.user.update({
                where: { id: user.id },
                data: {
                    fullName: user.fullName || fullName,
                    avatarUrl: user.avatarUrl || avatarUrl,
                    isVerified: true,
                },
            });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        await redis_1.redis.set(`refresh:${user.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Google login failed",
        });
    }
};
exports.googleCallback = googleCallback;
//# sourceMappingURL=auth.controller.js.map