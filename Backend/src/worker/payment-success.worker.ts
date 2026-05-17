import { Worker } from "bullmq";
import { redis } from "../utils/redis";
import { confirmBookingService } from "../services/booking-confirmation.service";
import { createInvoiceService } from "../services/invoice.service";
import { generateInvoicePDF } from "../services/invoice-pdf.service";
import { prisma } from "../utils/prisma";
import { sendInvoiceEmail } from "../utils/mail";

new Worker(
  "payment-success",
  async (job) => {
    const { bookingId } = job.data;

    const booking = await confirmBookingService(bookingId);

    const invoice = await createInvoiceService(bookingId);

    const pdfPath = await generateInvoicePDF(invoice, booking);

    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        pdfUrl: pdfPath,
      },
    });

    if (booking.user?.email) {
      try {
        await sendInvoiceEmail({
          to: booking.user.email,
          pdfPath,
        });
      } catch (error) {
        console.error("[PAYMENT SUCCESS] send invoice email failed", error);
      }
    }
  },
  {
    connection: redis,
  },
);
