"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCinemaRoom = exports.getTrashCinemaRooms = exports.deleteCinemaRoom = exports.updateCinemaRoom = exports.getCinemaRoomById = exports.getRoomsByCinemaIdController = exports.getAllCinemaRooms = exports.createCinemaRoom = void 0;
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
const getAllCinemaRooms = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await (0, cinemaRoom_service_1.getAllCinemaRoomsService)(page, limit);
        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema rooms",
        });
    }
};
exports.getAllCinemaRooms = getAllCinemaRooms;
// GET ALL ROOMS BY CINEMA ID
const getRoomsByCinemaIdController = async (req, res) => {
    try {
        const { cinemaId } = req.params;
        if (!cinemaId || Array.isArray(cinemaId)) {
            return res.status(400).json({
                success: false,
                message: "Cinema ID is required",
            });
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await (0, cinemaRoom_service_1.getRoomsByCinemaIdService)({
            cinemaId,
            page,
            limit,
        });
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema rooms",
        });
    }
};
exports.getRoomsByCinemaIdController = getRoomsByCinemaIdController;
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
            message: "Room moved to trash successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to delete room",
        });
    }
};
exports.deleteCinemaRoom = deleteCinemaRoom;
const getTrashCinemaRooms = async (req, res) => {
    try {
        const rooms = await (0, cinemaRoom_service_1.getTrashCinemaRoomsService)();
        return res.status(200).json({
            success: true,
            data: rooms,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch trash rooms",
        });
    }
};
exports.getTrashCinemaRooms = getTrashCinemaRooms;
const restoreCinemaRoom = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        await (0, cinemaRoom_service_1.restoreCinemaRoomService)(id);
        return res.status(200).json({
            success: true,
            message: "Room restored successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to restore room",
        });
    }
};
exports.restoreCinemaRoom = restoreCinemaRoom;
//# sourceMappingURL=cinemaRoom.controller.js.map