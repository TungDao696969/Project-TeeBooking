import { Request, Response } from "express";
import {
  createBookingFromPaymentPayload,
  createVNPayPayment,
  handleVNPayIPN,
  handleVNPayReturn,
  type PaymentBookingPayload,
} from "../services/payment.service";
import { createVnpayPaymentUrl } from "../services/vnpay.service";
import {
  createMoMoPayment,
  handleMoMoIPN,
  handleMoMoReturn,
} from "../services/momo.service";

const getPaymentRedirectUrl = (
  status: "success" | "failed",
  bookingId?: string | null,
) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const url = new URL(`/payment-${status}`, frontendUrl);

  if (bookingId) {
    url.searchParams.set("bookingId", bookingId);
  }

  return url.toString();
};

export const createVnpayPaymentController = async (
  req: Request & { user?: { id: string } },
  res: Response,
) => {
  try {
    const { bookingId, ...payload } = req.body as {
      bookingId?: string;
    } & PaymentBookingPayload;

    let resolvedBookingId = bookingId;

    if (!resolvedBookingId) {
      if (!req.user?.id) {
        throw new Error("Unauthorized");
      }

      const booking = await createBookingFromPaymentPayload(
        req.user.id,
        payload as PaymentBookingPayload,
      );

      resolvedBookingId = booking.id;
    }

    const payment = await createVNPayPayment(resolvedBookingId);
    const amount = Number(payment.amount);
    const ipAddr =
      (req.headers["x-forwarded-for"] as string | undefined) ||
      req.ip ||
      "127.0.0.1";

    const paymentUrl = createVnpayPaymentUrl(payment.id, amount, ipAddr);

    console.log("[VNPAY] create payment", {
      bookingId,
      paymentId: payment.id,
      amount,
      ipAddr,
    });

    return res.status(200).json({
      success: true,
      paymentUrl,
    });
  } catch (error: any) {
    console.error("[VNPAY] create error", {
      error: error?.message,
      stack: error?.stack,
      body: req.body,
    });

    return res.status(400).json({
      success: false,
      message: error.message ?? "Failed to create VNPay payment",
    });
  }
};

export const vnpayReturnController = async (req: Request, res: Response) => {
  try {
    const { status, bookingId } = await handleVNPayReturn(req.query);

    return res.redirect(getPaymentRedirectUrl(status, bookingId));
  } catch (error: any) {
    console.error("[VNPAY] return error", {
      message: error?.message,
      stack: error?.stack,
      query: req.query,
    });

    return res.redirect(getPaymentRedirectUrl("failed"));
  }
};

export const vnpayIPNController = async (req: Request, res: Response) => {
  try {
    const result = await handleVNPayIPN(req.query);

    return res.json(result);
  } catch (error: any) {
    console.error("[VNPAY] IPN error", {
      message: error?.message,
      stack: error?.stack,
      query: req.query,
    });

    return res.json({
      RspCode: "99",
      Message: "Unknown error",
    });
  }
};

// MOMO
export const createMoMoController = async (
  req: Request & { user?: { id: string } },
  res: Response,
) => {
  try {
    const { bookingId, ...payload } = req.body as {
      bookingId?: string;
    } & PaymentBookingPayload;

    let resolvedBookingId = bookingId;

    if (!resolvedBookingId) {
      if (!req.user?.id) {
        throw new Error("Unauthorized");
      }

      const booking = await createBookingFromPaymentPayload(
        req.user.id,
        payload as PaymentBookingPayload,
      );

      resolvedBookingId = booking.id;
    }

    const payUrl = await createMoMoPayment(resolvedBookingId);

    return res.json({
      success: true,
      payUrl,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const momoIPNController = async (req: Request, res: Response) => {
  try {
    const result = await handleMoMoIPN(req.body);

    return res.json(result);
  } catch (error: any) {
    console.error("[MOMO] IPN error", {
      message: error?.message,
      stack: error?.stack,
      body: req.body,
    });

    return res.status(400).json({
      message: error.message || "Invalid MoMo IPN",
    });
  }
};

export const momoReturnController = async (req: Request, res: Response) => {
  try {
    const { status, bookingId } = await handleMoMoReturn(req.query);

    return res.redirect(getPaymentRedirectUrl(status, bookingId));
  } catch (error: any) {
    console.error("[MOMO] return error", {
      message: error?.message,
      stack: error?.stack,
      query: req.query,
    });

    return res.redirect(getPaymentRedirectUrl("failed"));
  }
};
