"use strict";
// src/controllers/ticket-type.controller.ts
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
exports.deleteTicketType = exports.updateTicketType = exports.getTicketTypeById = exports.getAllTicketTypes = exports.createTicketType = void 0;
const ticketTypeService = __importStar(require("../services/ticket-type.service"));
const createTicketType = async (req, res) => {
    try {
        const ticketType = await ticketTypeService.createTicketTypeService(req.body);
        return res.status(201).json({
            success: true,
            message: "Create ticket type successfully",
            data: ticketType,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createTicketType = createTicketType;
const getAllTicketTypes = async (req, res) => {
    try {
        const ticketTypes = await ticketTypeService.getAllTicketTypesService();
        return res.status(200).json({
            success: true,
            data: ticketTypes,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllTicketTypes = getAllTicketTypes;
const getTicketTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "ticket type ID is required",
            });
        }
        const ticketType = await ticketTypeService.getTicketTypeByIdService(id);
        if (!ticketType) {
            return res.status(404).json({
                success: false,
                message: "Ticket type not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: ticketType,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getTicketTypeById = getTicketTypeById;
const updateTicketType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "ticket type ID is required",
            });
        }
        const ticketType = await ticketTypeService.updateTicketTypeService(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Update ticket type successfully",
            data: ticketType,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateTicketType = updateTicketType;
const deleteTicketType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "ticket type ID is required",
            });
        }
        await ticketTypeService.deleteTicketTypeService(id);
        return res.status(200).json({
            success: true,
            message: "Delete ticket type successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteTicketType = deleteTicketType;
//# sourceMappingURL=ticket-type.controller.js.map