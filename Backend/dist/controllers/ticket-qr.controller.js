"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicketQRController = void 0;
const ticket_qr_service_1 = require("../services/ticket-qr.service");
const generateTicketQRController = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        if (!ticketId || Array.isArray(ticketId)) {
            return res.status(400).json({
                success: false,
                message: "Missing ticket ID",
            });
        }
        const result = await (0, ticket_qr_service_1.generateTicketQR)(ticketId, req.user.id);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.generateTicketQRController = generateTicketQRController;
//# sourceMappingURL=ticket-qr.controller.js.map