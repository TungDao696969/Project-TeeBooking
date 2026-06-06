import { Request, Response } from "express";

import {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getTrashUsersService,
  restoreUserService,
} from "../../services/admin/user.service";

import { errorHandler } from "../../utils/errorHandler";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);

    return res.status(201).json({
      success: true,

      message: "User created successfully",

      data: user,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to create user",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = String(req.query.search || "");

    const result = await getUsersService({
      page,

      limit,

      search,
    });

    return res.status(200).json({
      success: true,

      ...result,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch users",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid user Id",
      });
    }
    const user = await getUserByIdService(id);

    return res.status(200).json({
      success: true,

      data: user,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch user",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid user Id",
      });
    }
    const updatedUser = await updateUserService(id, req.body);

    return res.status(200).json({
      success: true,

      message: "User updated successfully",

      data: updatedUser,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid user Id",
      });
    }
    await deleteUserService(id);

    return res.status(200).json({
      success: true,

      message: "User deleted successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete user",
    });
  }
};

export const getTrashUsers = async (req: Request, res: Response) => {
  const users = await getTrashUsersService();

  return res.status(200).json({
    success: true,
    data: users,
  });
};

export const restoreUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaid user Id",
      });
    }
    await restoreUserService(id);

    return res.status(200).json({
      success: true,
      message: "User restored successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Restore failed",
    });
  }
};
