"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        console.log("Cookie refresh token:", refreshToken);
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }
        if (!process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT_REFRESH_SECRET is missing");
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        console.log("Decoded refresh token:", decoded);
        if (typeof decoded === "string" || !decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }
        // Check Redis token
        const storedRefreshToken = await redis_1.redis.get(`refresh:${decoded.userId}`);
        console.log("Redis stored token:", storedRefreshToken);
        if (!storedRefreshToken) {
            console.log("No refresh token found in Redis");
            return res.status(403).json({
                success: false,
                message: "Refresh token invalid",
            });
        }
        if (storedRefreshToken !== refreshToken) {
            console.log("Refresh token mismatch");
            return res.status(403).json({
                success: false,
                message: "Refresh token invalid",
            });
        }
        // check user
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        console.log("User:", user);
        if (!user || !user.isActive || !user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Refresh token invalid",
            });
        }
        const newAccessToken = (0, jwt_1.generateAccessToken)(user.id);
        const newRefreshToken = (0, jwt_1.generateRefreshToken)(user.id);
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
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Refresh token expired or invalid",
        });
    }
};
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=refreshToken.controller.js.map