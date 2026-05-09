"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validation_1 = require("../validations/auth.validation");
const registerController = async (req, res) => {
    try {
        const validateData = auth_validation_1.registerSchema.parse(req.body);
        const { user, token } = await (0, auth_service_1.registerUserService)(validateData);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
};
exports.registerController = registerController;
//# sourceMappingURL=auth.controller.js.map