import { Request, Response } from "express";
import {
  getAdminBookingsService,
  getAdminBookingDetailService,
  updateAdminBookingStatusService,
  adminCancelBookingService,
} from "../../services/admin/booking.service";
import { errorHandler } from "../../utils/errorHandler";
import { BookingStatus } from "../../generated/prisma/enums";

export const getAdminBookings = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "");
    const status = req.query.status as BookingStatus | undefined;

    const result = await getAdminBookingsService({
      page,
      limit,
      search,
      status,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch admin bookings",
    });
  }
};

export const getAdminBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await getAdminBookingDetailService(id);

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch admin booking detail",
    });
  }
};

export const updateAdminBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: BookingStatus };

    if (!id || Array.isArray(id) || !status) {
      return res.status(400).json({ success: false, message: "Missing id or status" });
    }

    const updated = await updateAdminBookingStatusService(id as string, status);

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updated,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update booking status",
    });
  }
};

export const adminCancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { refund = false } = req.body as { refund?: boolean };

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ success: false, message: "Missing booking ID" });
    }

    const result = await adminCancelBookingService(id as string, { refund });

    return res.status(200).json(result);
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to cancel booking",
    });
  }
};

