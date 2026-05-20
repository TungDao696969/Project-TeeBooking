"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsController = void 0;
const admin_service_1 = require("../../services/admin/admin.service");
const getDashboardStatsController = async (_req, res) => {
    const stats = await (0, admin_service_1.getDashboardStatsService)();
    return res.status(200).json({
        success: true,
        message: "Dashboard stats fetched successfully",
        data: stats,
    });
};
exports.getDashboardStatsController = getDashboardStatsController;
//# sourceMappingURL=admin.controller.js.map