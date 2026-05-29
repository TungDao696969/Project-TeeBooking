import axiosClient from "@/lib/axios";

export interface CreatePaymentPayload {
  showtimeId: string;

  seats: {
    seatId: string;
  }[];

  combos: {
    comboId: string;
    quantity: number;
  }[];

  tickets: {
    ticketTypeId: string;
    quantity: number;
  }[];

  voucherCode?: string;
}

export const createVNPayPayment = async (payload: CreatePaymentPayload) => {
  const response = await axiosClient.post("/payment/vnpay", payload);

  return response.data;
};

export const createMoMoPayment = async (payload: CreatePaymentPayload) => {
  const response = await axiosClient.post("/payment/momo/create", payload);

  return response.data;
};
