"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingDetailController = exports.createBooking = void 0;
const booking_current_service_1 = require("../services/booking-current.service");
const booking_service_1 = require("../services/booking.service");
const createBooking = async (req, res, next) => {
    try {
        const booking = await (0, booking_service_1.createBookingService)(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBooking = createBooking;
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