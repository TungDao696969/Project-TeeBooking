"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivePromotionController = exports.deletePromotionController = exports.updatePromotionController = exports.getPromotionByIdController = exports.getAllPromotionController = exports.createPromotionController = void 0;
const promotion_service_1 = require("../services/promotion.service");
const promotion_validation_1 = require("../validations/promotion.validation");
const createPromotionController = async (req, res) => {
    try {
        const body = promotion_validation_1.createPromotionSchema.parse(req.body);
        const promotion = await (0, promotion_service_1.createPromotionService)({
            ...body,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
        });
        return res.status(201).json({
            success: true,
            message: "Create promotion successfully",
            data: promotion,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
exports.createPromotionController = createPromotionController;
const getAllPromotionController = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const promotions = await (0, promotion_service_1.getAllPromotionService)(page, limit);
        return res.json({
            success: true,
            ...promotions,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
exports.getAllPromotionController = getAllPromotionController;
const getPromotionByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const promotion = await (0, promotion_service_1.getPromotionByIdService)(id);
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: "Promotion not found",
            });
        }
        return res.json({
            success: true,
            data: promotion,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
exports.getPromotionByIdController = getPromotionByIdController;
const updatePromotionController = async (req, res) => {
    try {
        const body = promotion_validation_1.updatePromotionSchema.parse(req.body);
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const updateData = {
            ...req.body,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
        };
        const promotion = await (0, promotion_service_1.updatePromotionService)(id, updateData);
        return res.json({
            success: true,
            message: "Update promotion successfully",
            data: promotion,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
exports.updatePromotionController = updatePromotionController;
const deletePromotionController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        await (0, promotion_service_1.deletePromotionService)(id);
        return res.json({
            success: true,
            message: "Delete promotion successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
exports.deletePromotionController = deletePromotionController;
const getActivePromotionController = async (req, res) => {
    try {
        const promotions = await (0, promotion_service_1.getActivePromotionService)();
        return res.json({
            success: true,
            data: promotions,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};
exports.getActivePromotionController = getActivePromotionController;
//# sourceMappingURL=promotion.controller.js.map