import api from "@/lib/axios";

import { PastBookingResponse, TicketTypeResponse } from "@/types/booking.type";

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

export const getPastBookingsService = async (
  page = 1,
  status?: string,
  search?: string,
) => {
  const response = await api.get<PastBookingResponse>("/booking/past", {
    params: {
      page,
      limit: 10,
      status,
      search,
    },
  });

  return response.data;
};
