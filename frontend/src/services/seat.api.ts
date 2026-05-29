import axios from "@/lib/axios";
import { SeatResponse } from "@/types/seat.type";

export const getSeatsByShowtime = async (
  showtimeId: string,
): Promise<SeatResponse> => {
  const response = await axios.get(`/showtimes/${showtimeId}/seats`);

  return response.data;
};
