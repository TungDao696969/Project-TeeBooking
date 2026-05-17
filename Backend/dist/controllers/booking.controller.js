"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentBookingController = void 0;
const booking_current_service_1 = require("../services/booking-current.service");
const getCurrentBookingController = async (req, res) => {
    try {
        const booking = await (0, booking_current_service_1.getCurrentBookingService)(req.user.id);
        return res.status(200).json({
            success: true,
            data: booking,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getCurrentBookingController = getCurrentBookingController;
//# sourceMappingURL=booking.controller.js.map