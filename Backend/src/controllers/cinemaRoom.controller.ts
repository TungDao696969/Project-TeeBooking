import { Request, Response } from "express";
import {
  createCinemaRoomService,
  getCinemaRoomService,
  getCinemaRoomByIdService,
  updateCinemaRoomService,
  deleteCinemaRoomService,
} from "../services/cinemaRoom.service";
import { errorHandler } from "../utils/errorHandler";
// CREATE
export const createCinemaRoom = async (req: Request, res: Response) => {
  try {
    const room = await createCinemaRoomService(req.body);

    return res.status(201).json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// GET ALL ROOMS BY CINEMA ID
export const getAllCinemaRooms = async (req: Request, res: Response) => {
  try {
    const { cinemaId } = req.params;

    if (!cinemaId || Array.isArray(cinemaId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cinema ID",
      });
    }

    const rooms = await getCinemaRoomService(cinemaId);

    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// GET ROOM DETAIL BY ROOM ID
export const getCinemaRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const room = await getCinemaRoomByIdService(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Cinema room not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// UPDATE ROOM
export const updateCinemaRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const room = await updateCinemaRoomService(id, req.body);

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// DELETE ROOM
export const deleteCinemaRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    await deleteCinemaRoomService(id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};
