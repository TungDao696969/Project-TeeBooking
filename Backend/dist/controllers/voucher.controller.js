"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVoucherController = exports.updateVoucherController = exports.getVoucherByIdController = exports.getAllVouchersController = exports.createVoucherController = void 0;
const voucher_service_1 = require("../services/voucher.service");
const voucher_schema_1 = require("../validations/voucher.schema");
const errorHandler_1 = require("../utils/errorHandler");
const createVoucherController = async (req, res) => {
    try {
        const validatedData = voucher_schema_1.createVoucherSchema.parse(req.body);
        const voucher = await (0, voucher_service_1.createVoucherService)(validatedData);
        return res.status(201).json({
            success: true,
            data: voucher,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to create voucher" });
    }
};
exports.createVoucherController = createVoucherController;
const getAllVouchersController = async (_req, res) => {
    try {
        const vouchers = await (0, voucher_service_1.getAllVouchersService)();
        return res.status(200).json({
            success: true,
            data: vouchers,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to fetch vouchers" });
    }
};
exports.getAllVouchersController = getAllVouchersController;
const getVoucherByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid voucher id",
            });
        }
        const voucher = await (0, voucher_service_1.getVoucherByIdService)(id);
        return res.status(200).json({
            success: true,
            data: voucher,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to fetch voucher" });
    }
};
exports.getVoucherByIdController = getVoucherByIdController;
const updateVoucherController = async (req, res) => {
    try {
        const validatedData = voucher_schema_1.updateVoucherSchema.parse(req.body);
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid voucher id",
            });
        }
        const voucher = await (0, voucher_service_1.updateVoucherService)(id, validatedData);
        return res.status(200).json({
            success: true,
            data: voucher,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to update voucher" });
    }
};
exports.updateVoucherController = updateVoucherController;
const deleteVoucherController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid voucher id",
            });
        }
        await (0, voucher_service_1.deleteVoucherService)(id);
        return res.status(200).json({
            success: true,
            message: "Voucher deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to delete voucher" });
    }
};
exports.deleteVoucherController = deleteVoucherController;
//# sourceMappingURL=voucher.controller.js.map