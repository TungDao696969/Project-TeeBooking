"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing");
    }
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error("JWT_REFRESH_SECRET is missing");
    }
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=jwt.js.map