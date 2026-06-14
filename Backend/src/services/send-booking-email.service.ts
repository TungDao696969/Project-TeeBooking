import QRCode from "qrcode";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import { prisma } from "../utils/prisma";
import { sendMailTemplateWithAttachments } from "../utils/mail";

/**
 * Generate a QR code as a PNG Buffer (for CID inline attachment in email).
 */
const generateQRBuffer = async (payload: object): Promise<Buffer> => {
  return QRCode.toBuffer(JSON.stringify(payload), {
    errorCorrectionLevel: "M",
    type: "png",
    margin: 1,
    width: 200,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });
};

/**
 * Send a booking confirmation email with embedded QR code(s) after successful payment.
 * Uses CID inline attachments so QR images display correctly in all email clients.
 */
export const sendBookingConfirmationEmail = async (
  bookingId: string,
): Promise<void> => {
  try {
    // ── 1. Fetch full booking details ──────────────────────────────────────
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: {
          select: { fullName: true, email: true },
        },
        showtime: {
          include: {
            movie: { select: { title: true } },
            room: {
              select: {
                roomName: true,
                cinema: { select: { name: true } },
              },
            },
          },
        },
        tickets: {
          include: {
            showtimeSeat: {
              include: {
                seat: { select: { seatRow: true, seatNumber: true, seatType: true } },
              },
            },
          },
        },
        combos: {
          include: {
            combo: { select: { name: true } },
          },
        },
      },
    });

    if (!booking || !booking.user?.email) {
      console.warn(
        `[BookingEmail] Booking ${bookingId} not found or has no email — skipping.`,
      );
      return;
    }

    // ── 2. Build QR buffers for each ticket (CID approach) ────────────────
    const attachments: nodemailer.SendMailOptions["attachments"] = [];

    const tickets = await Promise.all(
      booking.tickets.map(async (ticket, index) => {
        const seat = ticket.showtimeSeat?.seat;
        const seatLabel = seat
          ? `${seat.seatRow}${seat.seatNumber}`
          : ticket.id.substring(0, 6).toUpperCase();

        const seatType = seat?.seatType ?? "STANDARD";

        // QR payload — what the ticket scanner reads
        const qrPayload = {
          ticketId: ticket.id,
          bookingId: booking.id,
          bookingCode: booking.bookingCode,
          seatLabel,
        };

        // Generate QR as PNG buffer
        const qrBuffer = await generateQRBuffer(qrPayload);

        // Unique CID for each ticket
        const cid = `qr-ticket-${index}@teebooking`;

        // Register as inline attachment
        attachments.push({
          filename: `qr-${seatLabel}.png`,
          content: qrBuffer,
          cid,
          contentType: "image/png",
          contentDisposition: "inline",
        });

        // Persist logical QR reference in DB
        await prisma.bookingTicket.update({
          where: { id: ticket.id },
          data: { qrCode: `qr:${ticket.id}` },
        });

        return {
          ticketId: ticket.id,
          seatLabel,
          seatType,
          cid, // referenced in EJS template as cid:qr-ticket-0@teebooking
        };
      }),
    );

    // ── 3. Build seat badges ───────────────────────────────────────────────
    const seats = tickets.map((t) => ({
      label: t.seatLabel,
      type: t.seatType,
    }));

    // ── 4. Build combo list ────────────────────────────────────────────────
    const combos = booking.combos.map((bc) => ({
      name: bc.combo.name,
      quantity: bc.quantity,
      totalPrice: Number(bc.totalPrice),
    }));

    // ── 5. Format showtime ─────────────────────────────────────────────────
    const showtimeStart = booking.showtime?.startTime
      ? dayjs(booking.showtime.startTime)
      : null;

    const showDate = showtimeStart
      ? showtimeStart.format("DD/MM/YYYY")
      : "N/A";
    const showTime = showtimeStart ? showtimeStart.format("HH:mm") : "N/A";

    // ── 6. Build template context ──────────────────────────────────────────
    const context = {
      fullName: booking.user.fullName ?? "Khách hàng",
      bookingCode: booking.bookingCode,
      movieTitle: booking.showtime?.movie?.title ?? "N/A",
      cinemaName: booking.showtime?.room?.cinema?.name ?? "N/A",
      roomName: booking.showtime?.room?.roomName ?? "N/A",
      showDate,
      showTime,
      seats,
      tickets, // contains { ticketId, seatLabel, seatType, cid }
      combos,
      totalTicketPrice: Number(booking.totalTicketPrice),
      totalComboPrice: Number(booking.totalComboPrice),
      finalAmount: Number(booking.finalAmount),
    };

    // ── 7. Send email with CID attachments ────────────────────────────────
    const result = await sendMailTemplateWithAttachments(
      booking.user.email,
      `🎬 Xác nhận đặt vé - ${booking.bookingCode}`,
      "booking-confirmation",
      context,
      attachments,
    );

    if (result) {
      console.log(
        `[BookingEmail] ✅ Confirmation email sent to ${booking.user.email} for booking ${booking.bookingCode}`,
      );
    } else {
      console.error(
        `[BookingEmail] ❌ Failed to send confirmation email for booking ${booking.bookingCode}`,
      );
    }
  } catch (err) {
    // Non-blocking: log error but don't crash the payment flow
    console.error(
      `[BookingEmail] ❌ Unexpected error for booking ${bookingId}:`,
      err,
    );
  }
};
