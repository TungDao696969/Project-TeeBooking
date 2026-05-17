"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieReviewsController = exports.deleteReviewController = exports.updateReviewController = exports.createReviewController = void 0;
const review_service_1 = require("../services/review.service");
const errorHandler_1 = require("../utils/errorHandler");
const createReviewController = async (req, res) => {
    try {
        const result = await (0, review_service_1.createReviewService)(req.user.id, req.body);
        return res.status(201).json({
            success: true,
            data: result,
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
exports.createReviewController = createReviewController;
const updateReviewController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid id fail",
            });
        }
        const result = await (0, review_service_1.updateReviewService)(req.user.id, id, req.body);
        return res.status(200).json({
            success: true,
            data: result,
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
exports.updateReviewController = updateReviewController;
const deleteReviewController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid id fail",
            });
        }
        const result = await (0, review_service_1.deleteReviewService)(req.user.id, id);
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch notifications",
        });
    }
};
exports.deleteReviewController = deleteReviewController;
const getMovieReviewsController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { movieId } = req.params;
        if (!movieId || Array.isArray(movieId)) {
            return res.status(400).json({
                success: false,
                message: "Invaid Id fail",
            });
        }
        const result = await (0, review_service_1.getReviewService)(movieId, page, limit);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMovieReviewsController = getMovieReviewsController;
//# sourceMappingURL=review.controller.js.map