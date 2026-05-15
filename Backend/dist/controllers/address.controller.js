"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultAddressController = exports.deleteAddressController = exports.updateUserAddress = exports.getAddressByIdController = exports.getAddressController = exports.createAddressController = void 0;
const address_service_1 = require("../services/address.service");
const address_schema_1 = require("../validations/address.schema");
const errorHandler_1 = require("../utils/errorHandler");
const createAddressController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const validateData = address_schema_1.createAddressSchema.parse(req.body);
        const address = await (0, address_service_1.createAddressService)(req.user.id, validateData);
        res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: address,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to create address",
        });
    }
};
exports.createAddressController = createAddressController;
const getAddressController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const address = await (0, address_service_1.getAddressesService)(req.user.id);
        res.status(200).json({
            success: true,
            data: address,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to get addresses",
        });
    }
};
exports.getAddressController = getAddressController;
const getAddressByIdController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const { addressId } = req.params;
        if (!addressId || Array.isArray(addressId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        const address = await (0, address_service_1.getAddressByIdService)(req.user.id, addressId);
        res.status(200).json({
            success: true,
            data: address,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to get address",
        });
    }
};
exports.getAddressByIdController = getAddressByIdController;
const updateUserAddress = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const validateData = address_schema_1.updateAddressSchema.parse(req.body);
        const { addressId } = req.params;
        if (!addressId || Array.isArray(addressId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        const updateAddress = await (0, address_service_1.updateAddressService)(req.user.id, addressId, validateData);
        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: updateAddress,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update address",
        });
    }
};
exports.updateUserAddress = updateUserAddress;
const deleteAddressController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const { addressId } = req.params;
        if (!addressId || Array.isArray(addressId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        await (0, address_service_1.deleteAddressService)(req.user.id, addressId);
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to delete address",
        });
    }
};
exports.deleteAddressController = deleteAddressController;
const setDefaultAddressController = async (req, res) => {
    try {
        if (!req.user?.id) {
            throw new Error("Unauthorized");
        }
        const { addressId } = req.params;
        if (!addressId || Array.isArray(addressId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        await (0, address_service_1.setDefaultAddressService)(req.user.id, addressId);
        res.status(200).json({
            success: true,
            message: "Default address updated successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to set default address",
        });
    }
};
exports.setDefaultAddressController = setDefaultAddressController;
//# sourceMappingURL=address.controller.js.map