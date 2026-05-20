import { Request, Response } from "express";
import { getHomeService } from "../../services/home/home.service";
import { errorHandler } from "../../utils/errorHandler";
export const getHomeController = async (req: Request, res: Response) => {
  try {
    const data = await getHomeService();

    return res.status(200).json({
      success: true,
      message: "Get homepage successfully",
      data,
    });
  } catch (error) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch home",
    });
  }
};
