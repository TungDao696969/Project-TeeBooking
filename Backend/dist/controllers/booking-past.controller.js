"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingHistoryDetailController = exports.getPastBookingsController = void 0;
const booking_past_service_1 = require("../services/booking-past.service");
const getPastBookingsController = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const result = await (0, booking_past_service_1.getPastBookingsService)({
            userId: req.user.id,
            page,
            limit,
            status: req.query.status,
            search: req.query.search,
        });
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getPastBookingsController = getPastBookingsController;
const getBookingHistoryDetailController = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId || Array.isArray(bookingId)) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required",
            });
        }
        const booking = await (0, booking_past_service_1.getBookingHistoryDetail)(bookingId, req.user.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
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
exports.getBookingHistoryDetailController = getBookingHistoryDetailController;
//# sourceMappingURL=booking-past.controller.js.map