"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeController = void 0;
const home_service_1 = require("../../services/home/home.service");
const errorHandler_1 = require("../../utils/errorHandler");
const getHomeController = async (req, res) => {
    try {
        const data = await (0, home_service_1.getHomeService)();
        return res.status(200).json({
            success: true,
            message: "Get homepage successfully",
            data,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch home",
        });
    }
};
exports.getHomeController = getHomeController;
//# sourceMappingURL=home.controller.js.map