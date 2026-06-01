"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieShowtimes = exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getMovies = exports.createMovie = void 0;
const movieService = __importStar(require("../services/movie.service"));
const movie_validation_1 = require("../validations/movie.validation");
const errorHandler_1 = require("../utils/errorHandler");
const upload_cloudinary_1 = require("../configs/upload-cloudinary");
const createMovie = async (req, res) => {
    try {
        const validateData = movie_validation_1.createMovieSchema.parse(req.body);
        const files = req.files;
        const poster = files?.poster?.[0];
        const banner = files?.banner?.[0];
        const [posterUrl, bannerUrl] = await Promise.all([
            poster
                ? (0, upload_cloudinary_1.uploadToCloudinary)(poster.buffer, "booking/movies/posters")
                : Promise.resolve(undefined),
            banner
                ? (0, upload_cloudinary_1.uploadToCloudinary)(banner.buffer, "booking/movies/banners")
                : Promise.resolve(undefined),
        ]);
        const movie = await movieService.createMovieService({
            ...validateData,
            posterUrl,
            bannerUrl,
        });
        return res.status(201).json({
            success: true,
            data: movie,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to create movie",
        });
    }
};
exports.createMovie = createMovie;
const getMovies = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search;
    const movies = await movieService.getMoviesService(page, limit, search);
    return res.json({
        success: true,
        ...movies,
    });
};
exports.getMovies = getMovies;
const getMovieById = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid movie Id",
        });
    }
    const movie = await movieService.getMovieByIdService(id);
    if (!movie) {
        return res.status(404).json({
            success: false,
            message: "Movie not found",
        });
    }
    return res.json({
        success: true,
        data: movie,
    });
};
exports.getMovieById = getMovieById;
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid movie Id",
            });
        }
        const validateData = movie_validation_1.updateMovieSchema.parse(req.body);
        const files = req.files;
        const poster = files?.poster?.[0];
        const banner = files?.banner?.[0];
        const [posterUrl, bannerUrl] = await Promise.all([
            poster
                ? (0, upload_cloudinary_1.uploadToCloudinary)(poster.buffer, "booking/movies/posters")
                : Promise.resolve(undefined),
            banner
                ? (0, upload_cloudinary_1.uploadToCloudinary)(banner.buffer, "booking/movies/banners")
                : Promise.resolve(undefined),
        ]);
        const movie = await movieService.updateMovieService(id, {
            ...validateData,
            ...(posterUrl && { posterUrl }),
            ...(bannerUrl && { bannerUrl }),
        });
        return res.json({
            success: true,
            data: movie,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update movie",
        });
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid movie Id",
        });
    }
    await movieService.deleteMovieService(id);
    return res.json({
        success: true,
        message: "Delete success",
    });
};
exports.deleteMovie = deleteMovie;
const getMovieShowtimes = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug || Array.isArray(slug)) {
            return res.status(400).json({
                success: false,
                message: "Movie slug is required",
            });
        }
        const result = await movieService.getMovieShowtimesService(slug);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch movie showtimes",
        });
    }
};
exports.getMovieShowtimes = getMovieShowtimes;
//# sourceMappingURL=movie.controller.js.map