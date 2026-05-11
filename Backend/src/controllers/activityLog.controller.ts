import { Request, Response } from "express";
import {
  getUserActivityLogsService,
  getActivityLogByIdService,
  deleteActivityLogService,
  clearUserActivityLogsService,
} from "../services/activityLog.service";
import { errorHandler } from "../utils/errorHandler";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getUserActivityLogsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const logs = await getUserActivityLogsService(req.user!.id);

    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch activity logs",
    });
  }
};

export const getActivityLogByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { activityId } = req.params;

    if (!activityId || Array.isArray(activityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }

    const log = await getActivityLogByIdService(activityId, req.user!.id);

    return res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch activity log",
    });
  }
};

export const deleteActivityLogController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { activityId } = req.params;

    if (!activityId || Array.isArray(activityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    await deleteActivityLogService(activityId, req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Activity log deleted successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete activity log",
    });
  }
};

export const clearUserActivityLogsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    await clearUserActivityLogsService(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "All activity logs cleared successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to clear activity logs",
    });
  }
};