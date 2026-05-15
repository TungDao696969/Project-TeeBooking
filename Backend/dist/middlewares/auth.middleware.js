"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../utils/prisma");
const authMiddleware = async (req, res, next) => {
    try {
        // Lấy access token từ HttpOnly cookie
        const token = req.cookies?.access_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }
        // Verify JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }
        // Kiểm tra user tồn tại
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
            select: {
                id: true,
                role: true,
                isActive: true,
            },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
        }
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is disabled",
            });
        }
        // Gắn user vào request
        req.user = {
            id: user.id,
            role: user.role,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Token expired or invalid",
        });
    }
};
exports.authMiddleware = authMiddleware;
// Middleware phân quyền
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Access denied",
            });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=auth.middleware.js.map