import axiosClient from "@/lib/axios";
import { ShowtimePayload, ShowtimeResponse } from "@/types/admin/showtime.type";

export const showtimeService = {
  getAll: async (page = 1, limit = 10): Promise<ShowtimeResponse> => {
    const res = await axiosClient.get(`/showtime?page=${page}&limit=${limit}`);

    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosClient.get(`/showtime/${id}`);

    return res.data;
  },

  create: async (payload: ShowtimePayload) => {
    const res = await axiosClient.post("/showtime", payload);

    return res.data;
  },

  update: async (id: string, payload: ShowtimePayload) => {
    const res = await axiosClient.put(`/showtime/${id}`, payload);

    return res.data;
  },

  delete: async (id: string) => {
    const res = await axiosClient.delete(`/showtime/${id}`);

    return res.data;
  },
};
