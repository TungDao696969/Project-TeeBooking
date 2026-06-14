"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsController = void 0;
const admin_service_1 = require("../../services/admin/admin.service");
const getDashboardStatsController = async (_req, res) => {
    const data = await (0, admin_service_1.getDashboardStatsService)();
    return res.status(200).json({
        success: true,
        message: "Dashboard stats fetched successfully",
        data,
    });
};
exports.getDashboardStatsController = getDashboardStatsController;
//# sourceMappingURL=admin.controller.js.map