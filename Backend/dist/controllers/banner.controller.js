"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBannerController = exports.updateBannerController = exports.getBannerByIdController = exports.getAllBannerController = exports.createBannerController = void 0;
const banner_service_1 = require("../services/banner.service");
const errorHandler_1 = require("../utils/errorHandler");
const createBannerController = async (req, res) => {
    try {
        const banner = await (0, banner_service_1.createBannerService)(req.body);
        return res.status(201).json({
            success: true,
            message: "Create banner successfully",
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
                message: "Invalid room ID",
            });
        }
        const banner = await (0, banner_service_1.updateBannerService)(id, req.body);
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
            defaultMessage: "Failed to fetch banner",
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