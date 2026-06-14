"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUser = exports.getTrashUsers = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_service_1 = require("../../services/admin/user.service");
const errorHandler_1 = require("../../utils/errorHandler");
const createUser = async (req, res) => {
    try {
        const user = await (0, user_service_1.createUserService)(req.body);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to create user",
        });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const result = await (0, user_service_1.getUsersService)({
            page,
            limit,
            search,
        });
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch users",
        });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid user Id",
            });
        }
        const user = await (0, user_service_1.getUserByIdService)(id);
        return res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch user",
        });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid user Id",
            });
        }
        const updatedUser = await (0, user_service_1.updateUserService)(id, req.body);
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update user",
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid user Id",
            });
        }
        await (0, user_service_1.deleteUserService)(id);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to delete user",
        });
    }
};
exports.deleteUser = deleteUser;
const getTrashUsers = async (req, res) => {
    const users = await (0, user_service_1.getTrashUsersService)();
    return res.status(200).json({
        success: true,
        data: users,
    });
};
exports.getTrashUsers = getTrashUsers;
const restoreUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid user Id",
            });
        }
        await (0, user_service_1.restoreUserService)(id);
        return res.status(200).json({
            success: true,
            message: "User restored successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Restore failed",
        });
    }
};
exports.restoreUser = restoreUser;
//# sourceMappingURL=user.controller.js.map