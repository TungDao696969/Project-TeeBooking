import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createNotificationService,
  getAllNotificationService,
  getNotificationByIdService,
  updateNotificationService,
  markAsReadService,
  deleteNotificationService,
} from "../services/notification.service";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../validations/notification.validation";
import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
export const createNotificationController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const validateData = createNotificationSchema.parse(req.body);

    const notification = await createNotificationService(
      req.user!.id,
      validateData,
    );

    return res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to create notification",
    });
  }
};

export const getUserNotificationsController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const notifications = await getAllNotificationService(req.user!.id);

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notifications",
    });
  }
};

export const getNotificationByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId || Array.isArray(notificationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }

    const notification = await getNotificationByIdService(
      notificationId,
      req.user!.id,
    );

    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch notification",
    });
  }
};

export const updateNotificationController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const validatedData = updateNotificationSchema.parse(req.body);
    const { notificationId } = req.params;

    if (!notificationId || Array.isArray(notificationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    await updateNotificationService(
      notificationId,
      req.user!.id,
      validatedData,
    );

    return res.status(200).json({
      success: true,
      message: "Notification updated successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to update notification",
    });
  }
};

export const markAllNotificationsAsReadController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId || Array.isArray(notificationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    await markAsReadService(req.user!.id, notificationId);

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to mark notifications as read",
    });
  }
};

export const deleteNotificationController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId || Array.isArray(notificationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }
    await deleteNotificationService(notificationId, req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to delete notification",
    });
  }
};
