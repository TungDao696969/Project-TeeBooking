import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { sendBookingConfirmationEmail } from "../services/send-booking-email.service";

export const sepayWebhookController = async (req: Request, res: Response) => {
  try {
    console.log("SEPAY WEBHOOK RECEIVED:", req.body);
    const { content, transferAmount, id, referenceCode } = req.body;

    const match = String(content).match(/BK\d{8}/);
    const codeToSearch = match ? match[0] : content;

    console.log("Extracted Booking Code:", codeToSearch);

    const booking = await prisma.booking.findUnique({
      where: {
        bookingCode: codeToSearch,
      },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (Number(booking.finalAmount) !== Number(transferAmount)) {
      return res
        .status(400)
        .json({ success: false, message: "Amount mismatch" });
    }

    if (booking.status === "confirmed") {
      return res.status(200).json({ success: true });
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          bookingId: booking.id,
          paymentMethod: "bank_transfer",
          amount: Number(transferAmount),
          transactionCode: String(referenceCode || id),
          status: "paid",
          paidAt: new Date(),
        },
      });

      await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: "confirmed",
          paymentStatus: "paid",
        },
      });
    });

    // ── Send confirmation email with QR code (non-blocking) ────────────────
    sendBookingConfirmationEmail(booking.id).catch((err) =>
      console.error("[Webhook] Failed to send booking confirmation email:", err),
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
