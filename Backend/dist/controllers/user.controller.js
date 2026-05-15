"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatarController = exports.updateUserController = exports.getUserProfileController = void 0;
const user_service_1 = require("../services/user.service");
const errorHandler_1 = require("../utils/errorHandler");
const user_schema_1 = require("../validations/user.schema");
const user_service_2 = require("../services/user.service");
const user_service_3 = require("../services/user.service");
const getUserProfileController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const profile = await (0, user_service_1.getUserProfileService)(req.user.id);
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: profile,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch user profile",
        });
    }
};
exports.getUserProfileController = getUserProfileController;
const updateUserController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const validatedData = user_schema_1.updateProfileSchema.parse(req.body);
        const updatedUser = await (0, user_service_2.updateUserProfileService)(req.user.id, validatedData);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update profile",
        });
    }
};
exports.updateUserController = updateUserController;
const uploadAvatarController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        if (!req.file) {
            throw new Error("No file uploaded");
        }
        const updatedUser = await (0, user_service_3.uploadAvatarService)(req.user.id, req.file);
        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error("Upload avatar error:", error);
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to upload avatar",
        });
    }
};
exports.uploadAvatarController = uploadAvatarController;
//# sourceMappingURL=user.controller.js.map