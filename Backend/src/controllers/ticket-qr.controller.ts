import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { generateTicketQR } from "../services/ticket-qr.service";

export const generateTicketQRController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const ticketId = req.params.ticketId;
    if (!ticketId || Array.isArray(ticketId)) {
      return res.status(400).json({
        success: false,
        message: "Missing ticket ID",
      });
    }

    const result = await generateTicketQR(ticketId, req.user!.id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
