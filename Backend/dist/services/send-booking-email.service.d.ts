/**
 * Send a booking confirmation email with embedded QR code(s) after successful payment.
 * Uses CID inline attachments so QR images display correctly in all email clients.
 */
export declare const sendBookingConfirmationEmail: (bookingId: string) => Promise<void>;
//# sourceMappingURL=send-booking-email.service.d.ts.map