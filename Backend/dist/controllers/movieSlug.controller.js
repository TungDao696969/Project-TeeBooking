"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieDetailController = void 0;
const movieSlug_service_1 = require("../services/movieSlug.service");
const getMovieDetailController = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug || Array.isArray(slug)) {
            return res.status(400).json({
                success: false,
                message: "Slug is required",
            });
        }
        const result = await (0, movieSlug_service_1.getMovieDetailService)(slug);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMovieDetailController = getMovieDetailController;
//# sourceMappingURL=movieSlug.controller.js.map