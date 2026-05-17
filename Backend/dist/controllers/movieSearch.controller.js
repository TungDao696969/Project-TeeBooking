"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMoviesController = void 0;
const movieSearch_service_1 = require("../services/movieSearch.service");
const errorHandler_1 = require("../utils/errorHandler");
const searchMoviesController = async (req, res) => {
    try {
        const result = await (0, movieSearch_service_1.searchMoviesService)(req.query);
        return res.status(200).json({
            success: true,
            data: result,
        });
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
//# sourceMappingURL=movieSearch.controller.js.map