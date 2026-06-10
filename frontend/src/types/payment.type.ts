export interface PaymentResponse {
  bookingId: string;
  bookingCode: string;
  amount: number;
  qrUrl: string;
  expiresAt: string;
}
