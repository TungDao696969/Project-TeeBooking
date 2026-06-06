import { Request, Response } from "express";
import {
  createSeatService,
  deleteSeatService,
  generateSeatService,
  getAllSeatsService,
  getSeatByIdService,
  getSeatsByRoomService,
  getTrashSeatsService,
  restoreSeatService,
  updateSeatService,
} from "../services/seat.service";
import { errorHandler } from "../utils/errorHandler";
// CREATE
export const createSeat = async (req: Request, res: Response) => {
  try {
    const seat = await createSeatService(req.body);

    return res.status(201).json({
      success: true,
      data: seat,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

// AUTO GENERATE
export const generateSeats = async (req: Request, res: Response) => {
  try {
    const { roomId, rows, seatsPerRow, seatType } = req.body;

    const seats = await generateSeatService(
      roomId,
      rows,
      seatsPerRow,
      seatType,
    );

    return res.status(201).json({
      success: true,
      count: seats.length,
      data: seats,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

// GET ALL
export const getAllSeats = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getAllSeatsService(page, limit);

    return res.status(200).json({
      success: true,
      data: result.seats,
      pagination: result.pagination,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch seats",
    });
  }
};

// GET BY ROOM
export const getSeatsByRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!roomId || Array.isArray(roomId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const seats = await getSeatsByRoomService(roomId);

    return res.status(200).json({
      success: true,
      count: seats.length,
      data: seats,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

// GET BY ID
export const getSeatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const seat = await getSeatByIdService(id);

    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "Seat not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: seat,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

// UPDATE
export const updateSeat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const updated = await updateSeatService(id, req.body);

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

// DELETE
export const deleteSeat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat ID",
      });
    }

    await deleteSeatService(id);

    return res.status(200).json({
      success: true,
      message: "Seat moved to trash successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete seat",
    });
  }
};

export const getTrashSeats = async (req: Request, res: Response) => {
  try {
    const seats = await getTrashSeatsService();

    return res.status(200).json({
      success: true,
      count: seats.length,
      data: seats,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch trash seats",
    });
  }
};

export const restoreSeat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat ID",
      });
    }

    await restoreSeatService(id);

    return res.status(200).json({
      success: true,
      message: "Seat restored successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to restore seat",
    });
  }
};
