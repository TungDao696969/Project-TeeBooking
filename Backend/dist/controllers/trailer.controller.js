"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrailerController = exports.updateTrailerController = exports.getTrailerByIdController = exports.getTrailersByMovieController = exports.createTrailerController = void 0;
const trailer_service_1 = require("../services/trailer.service");
const errorHandler_1 = require("../utils/errorHandler");
const createTrailerController = async (req, res) => {
    try {
        const result = await (0, trailer_service_1.createTrailerService)(req.body);
        return res.status(201).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.createTrailerController = createTrailerController;
const getTrailersByMovieController = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!movieId || Array.isArray(movieId)) {
            return res.status(400).json({
                success: false,
                message: "Invaid id fail",
            });
        }
        const result = await (0, trailer_service_1.getTrailerByMovieService)(movieId);
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getTrailersByMovieController = getTrailersByMovieController;
const getTrailerByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid id fail",
            });
        }
        const result = await (0, trailer_service_1.getTrailerByIdService)(id);
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getTrailerByIdController = getTrailerByIdController;
const updateTrailerController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid id fail",
            });
        }
        const result = await (0, trailer_service_1.updateTrailerService)(id, req.body);
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.updateTrailerController = updateTrailerController;
const deleteTrailerController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid id fail",
            });
        }
        const result = await (0, trailer_service_1.deleteTrailerService)(id);
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.deleteTrailerController = deleteTrailerController;
//# sourceMappingURL=trailer.controller.js.map