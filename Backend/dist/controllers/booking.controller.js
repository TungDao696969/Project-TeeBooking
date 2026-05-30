"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingDetailController = void 0;
const booking_current_service_1 = require("../services/booking-current.service");
const getBookingDetailController = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        if (!bookingId || Array.isArray(bookingId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking id",
            });
        }
        const booking = await (0, booking_current_service_1.getBookingDetailService)(bookingId, req.user.id);
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
exports.getBookingDetailController = getBookingDetailController;
//# sourceMappingURL=booking.controller.js.map