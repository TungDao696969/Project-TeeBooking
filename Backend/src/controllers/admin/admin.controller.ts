import { Request, Response } from "express";
import { getDashboardStatsService } from "../../services/admin/admin.service";

export const getDashboardStatsController = async (
  _req: Request,
  res: Response,
) => {
  const stats = await getDashboardStatsService();

  return res.status(200).json({
    success: true,
    message: "Dashboard stats fetched successfully",
    data: stats,
  });
};
