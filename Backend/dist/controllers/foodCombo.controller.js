"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodComboController = exports.updateFoodComboController = exports.createFoodComboController = exports.getFoodComboByIdController = exports.getAllFoodCombosController = void 0;
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const foodCombo_service_1 = require("../services/foodCombo.service");
const getAllFoodCombosController = async (req, res) => {
    const combos = await (0, foodCombo_service_1.getAllFoodCombosService)();
    return res.status(200).json({
        success: true,
        data: combos,
    });
};
exports.getAllFoodCombosController = getAllFoodCombosController;
const getFoodComboByIdController = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Movie slug is required",
        });
    }
    const combo = await (0, foodCombo_service_1.getFoodComboByIdService)(id);
    if (!combo) {
        return res.status(404).json({
            success: false,
            message: "Food combo not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: combo,
    });
};
exports.getFoodComboByIdController = getFoodComboByIdController;
const createFoodComboController = async (req, res) => {
    let imageUrl = null;
    if (req.file) {
        const uploaded = await cloudinary_1.default.uploader.upload(req.file.path, {
            folder: "food-combos",
        });
        imageUrl = uploaded.secure_url;
    }
    const combo = await (0, foodCombo_service_1.createFoodComboService)({
        ...req.body,
        price: Number(req.body.price),
        stockQuantity: Number(req.body.stockQuantity),
        imageUrl,
    });
    return res.status(201).json({
        success: true,
        message: "Create combo successfully",
        data: combo,
    });
};
exports.createFoodComboController = createFoodComboController;
const updateFoodComboController = async (req, res) => {
    let imageUrl;
    if (req.file) {
        const uploaded = await cloudinary_1.default.uploader.upload(req.file.path, {
            folder: "food-combos",
        });
        imageUrl = uploaded.secure_url;
    }
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Movie slug is required",
        });
    }
    const combo = await (0, foodCombo_service_1.updateFoodComboService)(id, {
        ...req.body,
        ...(imageUrl && { imageUrl }),
    });
    return res.status(200).json({
        success: true,
        message: "Update combo successfully",
        data: combo,
    });
};
exports.updateFoodComboController = updateFoodComboController;
const deleteFoodComboController = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Movie slug is required",
        });
    }
    await (0, foodCombo_service_1.deleteFoodComboService)(id);
    return res.status(200).json({
        success: true,
        message: "Delete combo successfully",
    });
};
exports.deleteFoodComboController = deleteFoodComboController;
//# sourceMappingURL=foodCombo.controller.js.map