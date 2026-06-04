import api from "@/lib/axios";
import { SeatResponse } from "@/types/admin/seat.type";
import { CreateSeatFormData } from "@/schemas/admin/seat.schema";
export const getSeats = async (page: number): Promise<SeatResponse> => {
  const res = await api.get("/seat", {
    params: {
      page,
      limit: 10,
    },
  });

  return res.data;
};

export const createSeat = async (payload: CreateSeatFormData) => {
  const res = await api.post("/seat", payload);

  return res.data;
};
