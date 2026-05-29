import api from "@/lib/axios";

import { ReserveSeatResponse } from "@/types/showtime-seat";

export const reserveSeat = async (
  showtimeSeatId: string,
): Promise<ReserveSeatResponse> => {
  const response = await api.post(
    `/showtime-seat/${showtimeSeatId}/reserve-seats`,
  );

  return response.data;
};

export const releaseSeat = async (showtimeSeatId: string) => {
  const response = await api.post(
    `/showtime-seat/${showtimeSeatId}/release-seats`,
  );

  return response.data;
};
