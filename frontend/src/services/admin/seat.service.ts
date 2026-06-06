import api from "@/lib/axios";
import {
  SeatResponse,
  TrashSeatResponse,
  UpdateSeatInput,
} from "@/types/admin/seat.type";
import { SeatFormData, UpdateSeatFormData } from "@/schemas/admin/seat.schema";
import { SeatDetail } from "@/types/admin/seat.type";
export const getSeats = async (page: number): Promise<SeatResponse> => {
  const res = await api.get("/seat", {
    params: {
      page,
      limit: 10,
    },
  });

  return res.data;
};

export const createSeatService = async (data: SeatFormData) => {
  const payload = {
    ...data,
    seatCode: `${data.seatRow}${data.seatNumber}`,
  };

  const res = await api.post("/seat", payload);

  return res.data;
};

export const getSeatDetailService = async (id: string): Promise<SeatDetail> => {
  const res = await api.get(`/seat/${id}`);

  return res.data.data;
};

export const updateSeatService = async (
  id: string,
  data: UpdateSeatFormData,
) => {
  const response = await api.put(`/seat/${id}`, data);

  return response.data.data;
};

export const deleteSeatService = async (id: string) => {
  const response = await api.delete(`/seat/${id}`);

  return response.data;
};

export const getSeatsByRoomService = async (roomId: string) => {
  const response = await api.get<SeatResponse>(`/seat/room/${roomId}`);

  return response.data.data;
};

export const getTrashSeatsService = async (
  page = 1,
  limit = 10,
): Promise<TrashSeatResponse> => {
  const response = await api.get(`/seat/trash?page=${page}&limit=${limit}`);

  return response.data;
};

export const restoreSeatService = async (id: string) => {
  const response = await api.patch(`/seat/${id}/restore`);

  return response.data;
};


