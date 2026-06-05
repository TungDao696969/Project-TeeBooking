import api from "@/lib/axios";
import { RoomResponse } from "@/types/admin/room.type";
import {
  Room,
  RoomListResponse,
  UpdateCinemaRoomPayload,
} from "@/types/admin/room.type";
import { CreateRoomPayload } from "@/types/admin/room.type";
import { RoomDetail } from "@/types/admin/room.type";
export const getRooms = async (page: number): Promise<RoomListResponse> => {
  const res = await api.get(`/cinema-rooms?page=${page}&limit=10`);

  return res.data;
};

export const createRoom = async (payload: CreateRoomPayload) => {
  const res = await api.post("/cinema-rooms", payload);

  return res.data;
};

export const getRoomDetail = async (id: string): Promise<RoomDetail> => {
  const res = await api.get(`/cinema-rooms/${id}`);

  return res.data.data;
};

export const deleteRoom = async (id: string) => {
  const res = await api.delete(`/cinema-rooms/${id}`);

  return res.data;
};

export const updateRoom = async (
  id: string,
  payload: UpdateCinemaRoomPayload,
) => {
  const response = await api.put(`/cinema-rooms/${id}`, payload);

  return response.data;
};

export const getRoomsByCinema = async (
  cinemaId: string,
  page: number,
  limit = 10,
): Promise<RoomListResponse> => {
  const res = await api.get(`/cinema-rooms/cinema/${cinemaId}`, {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};
