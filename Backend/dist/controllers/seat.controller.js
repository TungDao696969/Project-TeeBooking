"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreSeat = exports.getTrashSeats = exports.deleteSeat = exports.updateSeat = exports.getSeatById = exports.getSeatsByRoom = exports.getAllSeats = exports.generateSeats = exports.createSeat = void 0;
const seat_service_1 = require("../services/seat.service");
const errorHandler_1 = require("../utils/errorHandler");
const seat_validation_1 = require("../validations/seat.validation");
// CREATE
const createSeat = async (req, res) => {
    try {
        const seat = await (0, seat_service_1.createSeatService)(req.body);
        return res.status(201).json({
            success: true,
            data: seat,
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
exports.createSeat = createSeat;
// AUTO GENERATE
const generateSeats = async (req, res) => {
    try {
        const payload = seat_validation_1.generateSeatSchema.parse(req.body);
        const seats = await (0, seat_service_1.generateSeatService)(payload);
        return res.status(201).json({
            success: true,
            count: seats.length,
            data: seats,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Generate seats failed",
        });
    }
};
exports.generateSeats = generateSeats;
// GET ALL
const getAllSeats = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await (0, seat_service_1.getAllSeatsService)(page, limit);
        return res.status(200).json({
            success: true,
            data: result.seats,
            pagination: result.pagination,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch seats",
        });
    }
};
exports.getAllSeats = getAllSeats;
// GET BY ROOM
const getSeatsByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (!roomId || Array.isArray(roomId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const seats = await (0, seat_service_1.getSeatsByRoomService)(roomId);
        return res.status(200).json({
            success: true,
            count: seats.length,
            data: seats,
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
exports.getSeatsByRoom = getSeatsByRoom;
// GET BY ID
const getSeatById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const seat = await (0, seat_service_1.getSeatByIdService)(id);
        if (!seat) {
            return res.status(404).json({
                success: false,
                message: "Seat not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: seat,
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
exports.getSeatById = getSeatById;
// UPDATE
const updateSeat = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const updated = await (0, seat_service_1.updateSeatService)(id, req.body);
        return res.status(200).json({
            success: true,
            data: updated,
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
exports.updateSeat = updateSeat;
// DELETE
const deleteSeat = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid seat ID",
            });
        }
        await (0, seat_service_1.deleteSeatService)(id);
        return res.status(200).json({
            success: true,
            message: "Seat moved to trash successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to delete seat",
        });
    }
};
exports.deleteSeat = deleteSeat;
const getTrashSeats = async (req, res) => {
    try {
        const seats = await (0, seat_service_1.getTrashSeatsService)();
        return res.status(200).json({
            success: true,
            count: seats.length,
            data: seats,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch trash seats",
        });
    }
};
exports.getTrashSeats = getTrashSeats;
const restoreSeat = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid seat ID",
            });
        }
        await (0, seat_service_1.restoreSeatService)(id);
        return res.status(200).json({
            success: true,
            message: "Seat restored successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to restore seat",
        });
    }
};
exports.restoreSeat = restoreSeat;
//# sourceMappingURL=seat.controller.js.map