"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSeat = exports.updateSeat = exports.getSeatById = exports.getSeatsByRoom = exports.getAllSeats = exports.generateSeats = exports.createSeat = void 0;
const seat_service_1 = require("../services/seat.service");
const errorHandler_1 = require("../utils/errorHandler");
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
        const { roomId, rows, seatsPerRow, seatType } = req.body;
        const seats = await (0, seat_service_1.generateSeatService)(roomId, rows, seatsPerRow, seatType);
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
            defaultMessage: "Failed to fetch notifications",
        });
    }
};
exports.generateSeats = generateSeats;
// GET ALL
const getAllSeats = async (_req, res) => {
    try {
        const seats = await (0, seat_service_1.getAllSeatsService)();
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
                message: "Invalid room ID",
            });
        }
        await (0, seat_service_1.deleteSeatService)(id);
        return res.status(200).json({
            success: true,
            message: "Seat deleted successfully",
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
exports.deleteSeat = deleteSeat;
//# sourceMappingURL=seat.controller.js.map