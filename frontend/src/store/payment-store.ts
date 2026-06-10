import { create } from "zustand";

interface PaymentState {
  bookingId: string | null;

  setBookingId: (bookingId: string) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  bookingId: null,

  setBookingId: (bookingId) =>
    set({
      bookingId,
    }),
}));
