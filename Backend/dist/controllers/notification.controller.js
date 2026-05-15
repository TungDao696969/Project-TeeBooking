"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationController = exports.markAllNotificationsAsReadController = exports.updateNotificationController = exports.getNotificationByIdController = exports.getUserNotificationsController = exports.createNotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
const notification_validation_1 = require("../validations/notification.validation");
const errorHandler_1 = require("../utils/errorHandler");
const createNotificationController = async (req, res) => {
    try {
        const validateData = notification_validation_1.createNotificationSchema.parse(req.body);
        const notification = await (0, notification_service_1.createNotificationService)(req.user.id, validateData);
        return res.status(201).json({
            success: true,
            data: notification,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to create notification",
        });
    }
};
exports.createNotificationController = createNotificationController;
const getUserNotificationsController = async (req, res) => {
    try {
        const notifications = await (0, notification_service_1.getAllNotificationService)(req.user.id);
        return res.status(200).json({
            success: true,
            data: notifications,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch notifications",
        });
    }
};
exports.getUserNotificationsController = getUserNotificationsController;
const getNotificationByIdController = async (req, res) => {
    try {
        const { notificationId } = req.params;
        if (!notificationId || Array.isArray(notificationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        const notification = await (0, notification_service_1.getNotificationByIdService)(notificationId, req.user.id);
        return res.status(200).json({
            success: true,
            data: notification,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch notification",
        });
    }
};
exports.getNotificationByIdController = getNotificationByIdController;
const updateNotificationController = async (req, res) => {
    try {
        const validatedData = notification_validation_1.updateNotificationSchema.parse(req.body);
        const { notificationId } = req.params;
        if (!notificationId || Array.isArray(notificationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        await (0, notification_service_1.updateNotificationService)(notificationId, req.user.id, validatedData);
        return res.status(200).json({
            success: true,
            message: "Notification updated successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update notification",
        });
    }
};
exports.updateNotificationController = updateNotificationController;
const markAllNotificationsAsReadController = async (req, res) => {
    try {
        const { notificationId } = req.params;
        if (!notificationId || Array.isArray(notificationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        await (0, notification_service_1.markAsReadService)(req.user.id, notificationId);
        return res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to mark notifications as read",
        });
    }
};
exports.markAllNotificationsAsReadController = markAllNotificationsAsReadController;
const deleteNotificationController = async (req, res) => {
    try {
        const { notificationId } = req.params;
        if (!notificationId || Array.isArray(notificationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        await (0, notification_service_1.deleteNotificationService)(notificationId, req.user.id);
        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to delete notification",
        });
    }
};
exports.deleteNotificationController = deleteNotificationController;
//# sourceMappingURL=notification.controller.js.map