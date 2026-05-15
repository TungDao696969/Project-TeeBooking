"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCinemaRoom = exports.updateCinemaRoom = exports.getCinemaRoomById = exports.getAllCinemaRooms = exports.createCinemaRoom = void 0;
const cinemaRoom_service_1 = require("../services/cinemaRoom.service");
const errorHandler_1 = require("../utils/errorHandler");
// CREATE
const createCinemaRoom = async (req, res) => {
    try {
        const room = await (0, cinemaRoom_service_1.createCinemaRoomService)(req.body);
        return res.status(201).json({
            success: true,
            data: room,
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
exports.createCinemaRoom = createCinemaRoom;
// GET ALL ROOMS BY CINEMA ID
const getAllCinemaRooms = async (req, res) => {
    try {
        const { cinemaId } = req.params;
        if (!cinemaId || Array.isArray(cinemaId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid cinema ID",
            });
        }
        const rooms = await (0, cinemaRoom_service_1.getCinemaRoomService)(cinemaId);
        return res.status(200).json({
            success: true,
            data: rooms,
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
exports.getAllCinemaRooms = getAllCinemaRooms;
// GET ROOM DETAIL BY ROOM ID
const getCinemaRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const room = await (0, cinemaRoom_service_1.getCinemaRoomByIdService)(id);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Cinema room not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: room,
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
exports.getCinemaRoomById = getCinemaRoomById;
// UPDATE ROOM
const updateCinemaRoom = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const room = await (0, cinemaRoom_service_1.updateCinemaRoomService)(id, req.body);
        return res.status(200).json({
            success: true,
            data: room,
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
exports.updateCinemaRoom = updateCinemaRoom;
// DELETE ROOM
const deleteCinemaRoom = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        await (0, cinemaRoom_service_1.deleteCinemaRoomService)(id);
        return res.status(200).json({
            success: true,
            message: "Deleted successfully",
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
exports.deleteCinemaRoom = deleteCinemaRoom;
//# sourceMappingURL=cinemaRoom.controller.js.map