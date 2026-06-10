import api from "@/lib/axios";

import { PaymentResponse } from "@/types/payment.type";

export const createPayment = async (bookingId: string) => {
  const { data } = await api.post<PaymentResponse>("/payment/create", {
    bookingId,
  });

  return data;
};
