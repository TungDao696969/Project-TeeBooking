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
exports.restoreCinema = exports.getTrashCinemas = exports.getCinemaShowtimes = exports.deleteCinema = exports.updateCinema = exports.getCinemaById = exports.getCinemaBySlug = exports.getAllCinemas = exports.createCinema = void 0;
const cinemaService = __importStar(require("../services/cinema.service"));
const errorHandler_1 = require("../utils/errorHandler");
const createCinema = async (req, res, next) => {
    try {
        const cinema = await cinemaService.createCinemaService(req.body);
        res.status(201).json({
            success: true,
            message: "Cinema created successfully",
            data: cinema,
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
exports.createCinema = createCinema;
const getAllCinemas = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const cinemas = await cinemaService.getCinemaService(page, limit);
        res.status(200).json({
            success: true,
            ...cinemas,
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
exports.getAllCinemas = getAllCinemas;
const getCinemaBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        if (!slug || Array.isArray(slug)) {
            return res.status(400).json({
                success: false,
                message: "Invaid cinema Id",
            });
        }
        const cinema = await cinemaService.getCinemaBySlugService(slug);
        res.status(200).json({
            success: true,
            data: cinema,
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
exports.getCinemaBySlug = getCinemaBySlug;
const getCinemaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid cinema Id",
            });
        }
        const cinema = await cinemaService.getCinemaByIdService(id);
        if (!cinema) {
            return res.status(404).json({
                success: false,
                message: "Cinema not found",
            });
        }
        res.status(200).json({
            success: true,
            data: cinema,
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
exports.getCinemaById = getCinemaById;
const updateCinema = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid cinema Id",
            });
        }
        const cinema = await cinemaService.updateCinemaService(id, req.body);
        res.status(200).json({
            success: true,
            message: "Cinema updated successfully",
            data: cinema,
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
exports.updateCinema = updateCinema;
const deleteCinema = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invaid cinema Id",
            });
        }
        await cinemaService.deleteCinemaService(id);
        res.status(200).json({
            success: true,
            message: "Cinema deleted successfully",
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
exports.deleteCinema = deleteCinema;
const getCinemaShowtimes = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug || Array.isArray(slug)) {
            return res.status(400).json({
                success: false,
                message: "Invaid cinema showtime slug",
            });
        }
        const data = await cinemaService.getCinemaShowtimesService(slug);
        return res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema showtimes",
        });
    }
};
exports.getCinemaShowtimes = getCinemaShowtimes;
const getTrashCinemas = async (req, res) => {
    try {
        const cinemas = await cinemaService.getTrashCinemasService();
        return res.status(200).json({
            success: true,
            data: cinemas,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch trash cinemas",
        });
    }
};
exports.getTrashCinemas = getTrashCinemas;
const restoreCinema = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid cinema id",
            });
        }
        await cinemaService.restoreCinemaService(id);
        return res.status(200).json({
            success: true,
            message: "Cinema restored successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to restore cinema",
        });
    }
};
exports.restoreCinema = restoreCinema;
//# sourceMappingURL=cinema.controller.js.map