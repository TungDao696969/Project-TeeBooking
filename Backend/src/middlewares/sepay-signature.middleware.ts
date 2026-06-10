import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

export const verifySePaySignature = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const signature = req.headers["x-sepay-signature"] as string;

  if (!signature) {
    return res.status(401).json({
      message: "Missing signature",
    });
  }

  const rawBody = (req as any).rawBody;

  const expected = crypto
    .createHmac("sha256", process.env.SEPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    return res.status(401).json({
      message: "Invalid signature",
    });
  }

  next();
};
