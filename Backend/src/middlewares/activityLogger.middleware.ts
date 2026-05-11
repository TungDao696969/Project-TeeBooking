import { Request, Response, NextFunction } from "express";
import { createActivityLogService } from "../services/activityLog.service";
import { AuthRequest } from "./auth.middleware";

export const activityLogger = (action: string, targetType: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { targetId } = req.params;
    if (!targetId || Array.isArray(targetId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid target id",
      });
    }
    if (req.user) {
      await createActivityLogService({
        userId: req.user.id,
        action,
        targetType,
        targetId: targetId,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });
    }

    next();
  };
};
