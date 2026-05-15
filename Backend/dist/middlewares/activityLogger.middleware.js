"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityLogger = void 0;
const activityLog_service_1 = require("../services/activityLog.service");
const activityLogger = (action, targetType) => {
    return async (req, res, next) => {
        const { targetId } = req.params;
        if (!targetId || Array.isArray(targetId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid target id",
            });
        }
        if (req.user) {
            await (0, activityLog_service_1.createActivityLogService)({
                userId: req.user.id,
                action,
                targetType,
                targetId: targetId,
                ipAddress: req.ip,
                userAgent: req.headers["user-agent"],
            });
        }
        next();
    };
};
exports.activityLogger = activityLogger;
//# sourceMappingURL=activityLogger.middleware.js.map