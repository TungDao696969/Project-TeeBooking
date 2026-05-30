import api from "@/lib/axios";

import { TicketTypeResponse } from "@/types/booking.type";

export const getTicketTypes = async (
  showtimeId: string,
): Promise<TicketTypeResponse["data"]> => {
  const response = await api.get(`/showtime/${showtimeId}/ticket-types`);

  return response.data.data;
};

export const getBookingById = async (bookingId: string) => {
  const res = await api.get(`/booking/${bookingId}`);
  return res.data.data;
};
