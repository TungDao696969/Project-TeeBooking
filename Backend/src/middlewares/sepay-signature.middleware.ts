import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

export const verifySePaySignature = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const signature = req.headers["x-sepay-signature"] as string;
  console.log("SEPAY WEBHOOK HEADERS:", req.headers);

  if (!signature) {
    console.log("SEPAY WEBHOOK FAILED: Missing signature");
    return res.status(401).json({
      message: "Missing signature",
    });
  }

  const rawBody = (req as any).rawBody;
  const timestamp = req.headers["x-sepay-timestamp"] as string;

  if (!timestamp) {
    console.log("SEPAY WEBHOOK FAILED: Missing timestamp");
    return res.status(401).json({
      message: "Missing timestamp",
    });
  }

  const dataToVerify = `${timestamp}.${rawBody}`;

  const expected = crypto
    .createHmac("sha256", process.env.SEPAY_WEBHOOK_SECRET!)
    .update(dataToVerify)
    .digest("hex");

  const expectedSignature = `sha256=${expected}`;

  if (signature !== expectedSignature) {
    console.log("SEPAY WEBHOOK FAILED: Signature mismatch. Expected:", expectedSignature, "Got:", signature);
    return res.status(401).json({
      message: "Invalid signature",
    });
  }

  next();
};
