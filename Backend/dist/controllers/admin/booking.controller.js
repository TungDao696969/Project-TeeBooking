"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCancelBooking = exports.updateAdminBookingStatus = exports.getAdminBookingById = exports.getAdminBookings = void 0;
const booking_service_1 = require("../../services/admin/booking.service");
const errorHandler_1 = require("../../utils/errorHandler");
const getAdminBookings = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const status = req.query.status;
        const result = await (0, booking_service_1.getAdminBookingsService)({
            page,
            limit,
            search,
            status,
        });
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch admin bookings",
        });
    }
};
exports.getAdminBookings = getAdminBookings;
const getAdminBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID",
            });
        }
        const booking = await (0, booking_service_1.getAdminBookingDetailService)(id);
        return res.status(200).json({
            success: true,
            data: booking,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch admin booking detail",
        });
    }
};
exports.getAdminBookingById = getAdminBookingById;
const updateAdminBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!id || Array.isArray(id) || !status) {
            return res.status(400).json({ success: false, message: "Missing id or status" });
        }
        const updated = await (0, booking_service_1.updateAdminBookingStatusService)(id, status);
        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            data: updated,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to update booking status",
        });
    }
};
exports.updateAdminBookingStatus = updateAdminBookingStatus;
const adminCancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { refund = false } = req.body;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ success: false, message: "Missing booking ID" });
        }
        const result = await (0, booking_service_1.adminCancelBookingService)(id, { refund });
        return res.status(200).json(result);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to cancel booking",
        });
    }
};
exports.adminCancelBooking = adminCancelBooking;
//# sourceMappingURL=booking.controller.js.map