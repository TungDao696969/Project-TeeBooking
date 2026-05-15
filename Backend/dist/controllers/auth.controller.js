"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.resetPasswordController = exports.forgotPasswordController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validation_1 = require("../validations/auth.validation");
const errorHandler_1 = require("../utils/errorHandler");
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
        sameSite: "strict",
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
        const { email, otp, newPassword } = req.body;
        await (0, auth_service_1.resetPasswordService)(email, otp, newPassword);
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
//# sourceMappingURL=auth.controller.js.map