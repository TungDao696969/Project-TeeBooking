import { Request, Response } from "express";
import {
  createGenreService,
  deleteGenreService,
  getGenreByIdService,
  getGenresService,
  updateGenreService,
} from "../services/genre.service";
import { success } from "zod";

export const createGenreController = async (req: Request, res: Response) => {
  try {
    const genre = await createGenreService(req.body.name);

    return res.status(201).json({
      success: true,
      data: genre,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGenresController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const result = await getGenresService(page, limit, search);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGenreByIdController = async (req: Request, res: Response) => {
  try {
    const { genreId } = req.params;
    if (!genreId || Array.isArray(genreId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid genre Id",
      });
    }
    const genre = await getGenreByIdService(genreId);

    return res.status(200).json({
      success: true,
      data: genre,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGenreController = async (req: Request, res: Response) => {
  try {
    const { genreId } = req.params;
    if (!genreId || Array.isArray(genreId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid genre Id",
      });
    }
    const genre = await updateGenreService(genreId, req.body.name);

    return res.status(200).json({
      success: true,
      data: genre,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGenreController = async (req: Request, res: Response) => {
  try {
    const { genreId } = req.params;
    if (!genreId || Array.isArray(genreId)) {
      return res.status(400).json({
        success: false,
        message: "Invaid genre Id",
      });
    }
    await deleteGenreService(genreId);

    return res.status(200).json({
      success: true,
      message: "Delete genre successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
