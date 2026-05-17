"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBookingShowtimeSeatController = exports.releaseShowtimeSeatController = exports.reserveShowtimeSeatController = void 0;
const showtimeSeat_service_1 = require("../services/showtimeSeat.service");
const errorHandler_1 = require("../utils/errorHandler");
const reserveShowtimeSeatController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid showtime seat ID",
            });
        }
        const seat = await (0, showtimeSeat_service_1.reservaSeatService)(id);
        return res.status(200).json({
            success: true,
            data: seat,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to reserve showtime seat",
        });
    }
};
exports.reserveShowtimeSeatController = reserveShowtimeSeatController;
const releaseShowtimeSeatController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid showtime seat ID",
            });
        }
        const seat = await (0, showtimeSeat_service_1.releaseSeatService)(id);
        return res.status(200).json({
            success: true,
            data: seat,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to release showtime seat",
        });
    }
};
exports.releaseShowtimeSeatController = releaseShowtimeSeatController;
const confirmBookingShowtimeSeatController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid showtime seat ID",
            });
        }
        const seat = await (0, showtimeSeat_service_1.confirmBookingSeatService)(id);
        return res.status(200).json({
            success: true,
            data: seat,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to confirm showtime seat booking",
        });
    }
};
exports.confirmBookingShowtimeSeatController = confirmBookingShowtimeSeatController;
//# sourceMappingURL=showtimeSeat.controller.js.map