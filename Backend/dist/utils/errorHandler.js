"use strict";
// src/utils/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = ({ error, res, defaultMessage = "Something went wrong", }) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
        return;
    }
    const message = error instanceof Error ? error.message : defaultMessage;
    let statusCode = 400;
    switch (message) {
        case "Email already exists":
        case "Phone already exists":
            statusCode = 409;
            break;
        case "Invalid credentials":
            statusCode = 401;
            break;
        case "Account is disabled":
        case "Please verify your email before logging in":
            statusCode = 403;
            break;
        case "OTP expired or invalid":
        case "Invalid OTP":
            statusCode = 400;
            break;
        case "Failed to send verification email":
            statusCode = 500;
            break;
        case "Unauthorized":
            statusCode = 401;
            break;
        case "User not found":
            statusCode = 404;
            break;
        case "No file uploaded":
            statusCode = 400;
            break;
        case "Only image files are allowed":
            statusCode = 400;
            break;
        default:
            statusCode = 400;
            break;
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map