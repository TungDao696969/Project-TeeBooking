"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUserActivityLogsController = exports.deleteActivityLogController = exports.getActivityLogByIdController = exports.getUserActivityLogsController = void 0;
const activityLog_service_1 = require("../services/activityLog.service");
const errorHandler_1 = require("../utils/errorHandler");
const getUserActivityLogsController = async (req, res) => {
    try {
        const logs = await (0, activityLog_service_1.getUserActivityLogsService)(req.user.id);
        return res.status(200).json({
            success: true,
            data: logs,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch activity logs",
        });
    }
};
exports.getUserActivityLogsController = getUserActivityLogsController;
const getActivityLogByIdController = async (req, res) => {
    try {
        const { activityId } = req.params;
        if (!activityId || Array.isArray(activityId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        const log = await (0, activityLog_service_1.getActivityLogByIdService)(activityId, req.user.id);
        return res.status(200).json({
            success: true,
            data: log,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch activity log",
        });
    }
};
exports.getActivityLogByIdController = getActivityLogByIdController;
const deleteActivityLogController = async (req, res) => {
    try {
        const { activityId } = req.params;
        if (!activityId || Array.isArray(activityId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id",
            });
        }
        await (0, activityLog_service_1.deleteActivityLogService)(activityId, req.user.id);
        return res.status(200).json({
            success: true,
            message: "Activity log deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to delete activity log",
        });
    }
};
exports.deleteActivityLogController = deleteActivityLogController;
const clearUserActivityLogsController = async (req, res) => {
    try {
        await (0, activityLog_service_1.clearUserActivityLogsService)(req.user.id);
        return res.status(200).json({
            success: true,
            message: "All activity logs cleared successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to clear activity logs",
        });
    }
};
exports.clearUserActivityLogsController = clearUserActivityLogsController;
//# sourceMappingURL=activityLog.controller.js.map