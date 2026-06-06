import { Request, Response } from "express";
import {
  createCinemaRoomService,
  getRoomsByCinemaIdService,
  getAllCinemaRoomsService,
  getCinemaRoomByIdService,
  updateCinemaRoomService,
  deleteCinemaRoomService,
  getTrashCinemaRoomsService,
  restoreCinemaRoomService,
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

export const getAllCinemaRooms = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const result = await getAllCinemaRoomsService(page, limit);

    return res.status(200).json({
      success: true,

      data: result.data,

      pagination: result.pagination,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema rooms",
    });
  }
};

// GET ALL ROOMS BY CINEMA ID
export const getRoomsByCinemaIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { cinemaId } = req.params;

    if (!cinemaId || Array.isArray(cinemaId)) {
      return res.status(400).json({
        success: false,
        message: "Cinema ID is required",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getRoomsByCinemaIdService({
      cinemaId,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema rooms",
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
      message: "Room moved to trash successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete room",
    });
  }
};

export const getTrashCinemaRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await getTrashCinemaRoomsService();

    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch trash rooms",
    });
  }
};

export const restoreCinemaRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    await restoreCinemaRoomService(id);

    return res.status(200).json({
      success: true,
      message: "Room restored successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to restore room",
    });
  }
};
