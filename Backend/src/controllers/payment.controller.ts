import { Request, Response } from "express";
import { createVNPayPayment } from "../services/payment.service";
import { createVnpayPaymentUrl } from "../services/vnpay.service";
import { createSecureHash } from "../utils/vnpay";
import { prisma } from "../utils/prisma";
import { createMoMoPayment, handleMoMoIPN } from "../services/momo.service";

export const createVnpayPaymentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      throw new Error("Missing bookingId");
    }

    const payment = await createVNPayPayment(bookingId);
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
    const secretKey = process.env.VNP_HASH_SECRET;
    if (!secretKey) {
      throw new Error("Missing VNPay hash secret configuration");
    }

    const vnpParams = Object.fromEntries(
      Object.entries(req.query || {}).map(([key, value]) => [
        key,
        Array.isArray(value) ? value[0] : value,
      ]),
    ) as Record<string, string | undefined>;

    const secureHash = vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    if (!secureHash) {
      throw new Error("Missing vnp_SecureHash");
    }

    const checkHash = createSecureHash(vnpParams, secretKey);

    if (secureHash.toLowerCase() !== checkHash.toLowerCase()) {
      throw new Error("Invalid checksum");
    }

    const paymentId = vnpParams.vnp_TxnRef;
    const responseCode = vnpParams.vnp_ResponseCode;
    const transactionNo = vnpParams.vnp_TransactionNo;

    if (!paymentId) {
      throw new Error("Missing vnp_TxnRef");
    }

    if (responseCode === "00") {
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: "paid",
          paidAt: new Date(),
          transactionCode: transactionNo,
        },
      });

      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          paymentStatus: "paid",
        },
      });

      return res.redirect("http://localhost:3000/payment-success");
    }

    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "failed",
      },
    });

    return res.redirect("http://localhost:3000/payment-failed");
  } catch (error: any) {
    console.error("[VNPAY] return error", {
      message: error?.message,
      stack: error?.stack,
      query: req.query,
    });

    return res.redirect("http://localhost:3000/payment-failed");
  }
};

// MOMO
export const createMoMoController = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    const payUrl = await createMoMoPayment(bookingId);

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
  const result = await handleMoMoIPN(req.body);

  return res.json(result);
};

export const momoReturnController = async (req: Request, res: Response) => {
  return res.send("Payment completed");
};
