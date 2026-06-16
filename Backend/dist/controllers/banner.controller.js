"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBannerController = exports.updateBannerController = exports.getBannerByIdController = exports.getAllBannersAdminController = exports.getAllBannerController = exports.createBannerController = void 0;
const banner_service_1 = require("../services/banner.service");
const errorHandler_1 = require("../utils/errorHandler");
const banner_validation_1 = require("../validations/banner.validation");
const upload_cloudinary_1 = require("../configs/upload-cloudinary");
const createBannerController = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        const validateData = banner_validation_1.createBannerSchema.parse(req.body);
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Banner image is required",
            });
        }
        const imageUrl = await (0, upload_cloudinary_1.uploadToCloudinary)(req.file.buffer, "booking/banners");
        const banner = await (0, banner_service_1.createBannerService)({
            title: validateData.title,
            redirectUrl: validateData.redirectUrl || "",
            startDate: new Date(validateData.startDate),
            endDate: new Date(validateData.endDate),
            isActive: validateData.isActive ?? true,
            imageUrl,
        });
        return res.status(201).json({
            success: true,
            message: "Create banner successfully",
            data: banner,
        });
    }
    catch (error) {
        console.log(error);
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to create banner",
        });
    }
};
exports.createBannerController = createBannerController;
const getAllBannerController = async (req, res) => {
    try {
        const banners = await (0, banner_service_1.getAllBannerService)();
        return res.status(200).json({
            success: true,
            data: banners,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch banner",
        });
    }
};
exports.getAllBannerController = getAllBannerController;
const getAllBannersAdminController = async (req, res) => {
    try {
        const banners = await (0, banner_service_1.getAllBannersAdminService)();
        return res.status(200).json({
            success: true,
            data: banners,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch banners",
        });
    }
};
exports.getAllBannersAdminController = getAllBannersAdminController;
const getBannerByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const banner = await (0, banner_service_1.getBannerById)(id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: banner,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch banner",
        });
    }
};
exports.getBannerByIdController = getBannerByIdController;
const updateBannerController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid banner ID",
            });
        }
        const validateData = banner_validation_1.updateBannerSchema.parse(req.body);
        // If a new image is uploaded, upload to Cloudinary
        let imageUrl = undefined;
        if (req.file) {
            imageUrl = await (0, upload_cloudinary_1.uploadToCloudinary)(req.file.buffer, "booking/banners");
        }
        const updateData = { ...validateData };
        if (validateData.startDate)
            updateData.startDate = new Date(validateData.startDate);
        if (validateData.endDate)
            updateData.endDate = new Date(validateData.endDate);
        if (imageUrl)
            updateData.imageUrl = imageUrl;
        const banner = await (0, banner_service_1.updateBannerService)(id, updateData);
        return res.status(200).json({
            success: true,
            message: "Update banner successfully",
            data: banner,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update banner",
        });
    }
};
exports.updateBannerController = updateBannerController;
const deleteBannerController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        await (0, banner_service_1.deleteBannerService)(id);
        return res.status(200).json({
            success: true,
            message: "Delete banner successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch banner",
        });
    }
};
exports.deleteBannerController = deleteBannerController;
//# sourceMappingURL=banner.controller.js.map