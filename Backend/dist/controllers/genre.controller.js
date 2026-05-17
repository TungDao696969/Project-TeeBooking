"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenreController = exports.updateGenreController = exports.getGenreByIdController = exports.getGenresController = exports.createGenreController = void 0;
const genre_service_1 = require("../services/genre.service");
const createGenreController = async (req, res) => {
    try {
        const genre = await (0, genre_service_1.createGenreService)(req.body.name);
        return res.status(201).json({
            success: true,
            data: genre,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createGenreController = createGenreController;
const getGenresController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const result = await (0, genre_service_1.getGenresService)(page, limit, search);
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getGenresController = getGenresController;
const getGenreByIdController = async (req, res) => {
    try {
        const { genreId } = req.params;
        if (!genreId || Array.isArray(genreId)) {
            return res.status(400).json({
                success: false,
                message: "Invaid genre Id",
            });
        }
        const genre = await (0, genre_service_1.getGenreByIdService)(genreId);
        return res.status(200).json({
            success: true,
            data: genre,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getGenreByIdController = getGenreByIdController;
const updateGenreController = async (req, res) => {
    try {
        const { genreId } = req.params;
        if (!genreId || Array.isArray(genreId)) {
            return res.status(400).json({
                success: false,
                message: "Invaid genre Id",
            });
        }
        const genre = await (0, genre_service_1.updateGenreService)(genreId, req.body.name);
        return res.status(200).json({
            success: true,
            data: genre,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateGenreController = updateGenreController;
const deleteGenreController = async (req, res) => {
    try {
        const { genreId } = req.params;
        if (!genreId || Array.isArray(genreId)) {
            return res.status(400).json({
                success: false,
                message: "Invaid genre Id",
            });
        }
        await (0, genre_service_1.deleteGenreService)(genreId);
        return res.status(200).json({
            success: true,
            message: "Delete genre successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteGenreController = deleteGenreController;
//# sourceMappingURL=genre.controller.js.map