import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const sepayWebhookController = async (req: Request, res: Response) => {
  try {
    const { content, transferAmount, transactionId } = req.body;

    const booking = await prisma.booking.findUnique({
      where: {
        bookingCode: content,
      },
    });

    if (!booking) {
      return res.sendStatus(404);
    }

    if (Number(booking.finalAmount) !== Number(transferAmount)) {
      return res.sendStatus(400);
    }

    if (booking.status === "confirmed") {
      return res.sendStatus(200);
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          bookingId: booking.id,
          paymentMethod: "bank_transfer",
          amount: Number(transferAmount),
          transactionCode: String(transactionId),
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
        },
      });
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};
