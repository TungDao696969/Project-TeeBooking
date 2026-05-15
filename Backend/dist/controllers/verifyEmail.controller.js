"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailController = void 0;
const prisma_1 = require("../utils/prisma");
const verifyEmailController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user || user.verificationCode !== otp) {
            res.status(400).json({
                success: false,
                message: "Invalid verification code",
            });
            return;
        }
        await prisma_1.prisma.user.update({
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