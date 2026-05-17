"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityController = exports.updateCityController = exports.getCityByIdController = exports.getCitiesController = exports.createCityController = void 0;
const city_service_1 = require("../services/city.service");
const errorHandler_1 = require("../utils/errorHandler");
const createCityController = async (req, res) => {
    try {
        const result = await (0, city_service_1.createCityService)(req.body);
        return res.status(201).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch movies list",
        });
    }
};
exports.createCityController = createCityController;
const getCitiesController = async (req, res) => {
    try {
        const result = await (0, city_service_1.getCitiesService)();
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
exports.getCitiesController = getCitiesController;
const getCityByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: true,
                message: "Invaid Id fail",
            });
        }
        const result = await (0, city_service_1.getCityByIdService)(id);
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
exports.getCityByIdController = getCityByIdController;
const updateCityController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: true,
                message: "Invaid Id fail",
            });
        }
        const result = await (0, city_service_1.updateCityService)(id, req.body);
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
exports.updateCityController = updateCityController;
const deleteCityController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: true,
                message: "Invaid Id fail",
            });
        }
        const result = await (0, city_service_1.deleteCityService)(id);
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
exports.deleteCityController = deleteCityController;
//# sourceMappingURL=city.controller.js.map