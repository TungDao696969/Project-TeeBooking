"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieSuggestions = exports.searchMoviesController = void 0;
const movieSearch_service_1 = require("../services/movieSearch.service");
const errorHandler_1 = require("../utils/errorHandler");
const searchMoviesController = async (req, res) => {
    try {
        const result = await (0, movieSearch_service_1.searchMoviesService)({
            q: req.query.q,
            genre: req.query.genre,
            status: req.query.status,
            sort: req.query.sort,
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10,
            year: req.query.year ? Number(req.query.year) : undefined,
            minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
        });
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch movies list",
        });
    }
};
exports.searchMoviesController = searchMoviesController;
const getMovieSuggestions = async (req, res) => {
    try {
        const q = req.query.q?.toString() || "";
        const result = await (0, movieSearch_service_1.getMovieSuggestionsService)(q);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch suggestions",
        });
    }
};
exports.getMovieSuggestions = getMovieSuggestions;
//# sourceMappingURL=movieSearch.controller.js.map