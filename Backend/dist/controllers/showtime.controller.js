"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShowtime = exports.updateShowtime = exports.getShowtimeById = exports.getAllShowtimes = exports.createShowtime = void 0;
const showtime_service_1 = require("../services/showtime.service");
const errorHandler_1 = require("../utils/errorHandler");
const createShowtime = async (req, res) => {
    try {
        const showtime = await (0, showtime_service_1.createShowtimeService)(req.body);
        return res.status(201).json({
            success: true,
            data: showtime,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.createShowtime = createShowtime;
const getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await (0, showtime_service_1.getAllShowtimesService)();
        return res.status(200).json({
            success: true,
            count: showtimes.length,
            data: showtimes,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getAllShowtimes = getAllShowtimes;
const getShowtimeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const showtime = await (0, showtime_service_1.getShowtimeByIdService)(id);
        if (!showtime) {
            return res.status(404).json({
                success: false,
                message: "Showtime not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: showtime,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getShowtimeById = getShowtimeById;
const updateShowtime = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const updated = await (0, showtime_service_1.updateShowtimeService)(id, req.body);
        return res.status(200).json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.updateShowtime = updateShowtime;
const deleteShowtime = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        await (0, showtime_service_1.deleteShowtimeService)(id);
        return res.status(200).json({
            success: true,
            message: "Showtime deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.deleteShowtime = deleteShowtime;
//# sourceMappingURL=showtime.controller.js.map