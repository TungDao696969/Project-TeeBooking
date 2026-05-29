"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailController = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const verifyEmailController = async (req, res) => {
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
        const cachedRegisterData = await redis_1.redis.get(redisKey);
        if (!cachedRegisterData) {
            res.status(400).json({
                success: false,
                message: "OTP không hợp lệ hoặc đã hết hạn",
            });
            return;
        }
        const registerData = JSON.parse(cachedRegisterData);
        if (registerData.otp !== otp) {
            res.status(400).json({
                success: false,
                message: "Invalid verification code",
            });
            return;
        }
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            await redis_1.redis.del(redisKey);
            res.status(400).json({
                success: false,
                message: "Email đã tồn tại",
            });
            return;
        }
        await prisma_1.prisma.user.create({
            data: {
                fullName: registerData.fullName,
                email: registerData.email,
                phone: registerData.phone,
                passwordHash: registerData.passwordHash,
                gender: registerData.gender,
                dateOfBirth: new Date(registerData.dateOfBirth),
                role: registerData.role,
                isVerified: true,
            },
        });
        await redis_1.redis.del(redisKey);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Email verification failed";
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.verifyEmailController = verifyEmailController;
//# sourceMappingURL=verifyEmail.controller.js.map