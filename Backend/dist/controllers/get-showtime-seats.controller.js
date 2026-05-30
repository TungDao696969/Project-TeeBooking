"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowtimeSeatsController = void 0;
const get_showtime_seats_service_1 = require("../services/get-showtime-seats.service");
const errorHandler_1 = require("../utils/errorHandler");
const getShowtimeSeatsController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Showtime ID is required",
            });
        }
        const data = await (0, get_showtime_seats_service_1.getShowtimeSeatsService)(id);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch showtime seats",
        });
    }
};
exports.getShowtimeSeatsController = getShowtimeSeatsController;
//# sourceMappingURL=get-showtime-seats.controller.js.map