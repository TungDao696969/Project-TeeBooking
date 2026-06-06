import { ShowtimePayload, ShowtimeResponse } from "@/types/admin/showtime.type";
import api from "@/lib/axios";

export const getAllShowtime = async (
  page = 1,
  limit = 10,
): Promise<ShowtimeResponse> => {
  const res = await api.get(`/showtime?page=${page}&limit=${limit}`);

  return res.data;
};

export const createShowtime = async (payload: ShowtimePayload) => {
  const res = await api.post("/showtime", payload);

  return res.data;
};

export const getShowtimeByIdApi = async (id: string) => {
  const { data } = await api.get(`/showtime/${id}`);

  return data.data;
};

export const updateShowtimeApi = async ({
  id,
  payload,
}: {
  id: string;
  payload: ShowtimePayload;
}) => {
  const { data } = await api.put(`/showtime/${id}`, payload);

  return data;
};

export const deleteShowtimeApi = async (id: string) => {
  const { data } = await api.delete(`/showtime/${id}`);

  return data;
};

export const getShowtimeSeats = async (showtimeId: string) => {
  const res = await api.get(`/showtimes/${showtimeId}/seats`);

  return res.data.data;
};

export const getTrashShowtimesService = async () => {
  const response = await api.get("/showtimes/trash");

  return response.data;
};

export const restoreShowtimeService = async (id: string) => {
  const response = await api.patch(`/showtime/${id}/restore`);

  return response.data;
};
