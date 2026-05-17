"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingController = void 0;
const booking_cancel_service_1 = require("../services/booking-cancel.service");
const cancelBookingController = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId || Array.isArray(bookingId)) {
            return res.status(400).json({
                success: false,
                message: "Missing booking ID",
            });
        }
        const result = await (0, booking_cancel_service_1.cancelBookingService)({
            bookingId,
            userId: req.user.id,
        });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.cancelBookingController = cancelBookingController;
//# sourceMappingURL=booking-cancel.controller.js.map