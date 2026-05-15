"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesListController = void 0;
const movieList_service_1 = require("../services/movieList.service");
const errorHandler_1 = require("../utils/errorHandler");
const getMoviesListController = async (req, res) => {
    try {
        const result = await (0, movieList_service_1.getMoviesListService)(req.query);
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
exports.getMoviesListController = getMoviesListController;
//# sourceMappingURL=movieList.controller.js.map