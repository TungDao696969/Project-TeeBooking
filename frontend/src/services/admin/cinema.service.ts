import api from "@/lib/axios";
import { Cinema } from "@/types/cinema.type";
import { CinemaFormValues } from "@/schemas/admin/cinema.schema";
import type { CinemasResponse } from "@/types/admin/cinema.type";
interface City {
  id: string;
  name: string;
}

interface CityResponse {
  success: boolean;
  data: City[];
}

export const getCinemas = async (
  page: number = 1,
): Promise<CinemasResponse> => {
  const res = await api.get(`/cinema?page=${page}`);

  return res.data;
};

export const createCinema = async (payload: CinemaFormValues) => {
  const { data } = await api.post("/cinema", payload);

  return data;
};

export const getCities = async () => {
  const { data } = await api.get<CityResponse>("/city");

  return data.data;
};

export const getCinema = async (id: string) => {
  const { data } = await api.get<{ success: boolean; data: Cinema }>(
    `/cinema/${id}`,
  );

  return data.data;
};

export const updateCinema = async ({
  id,
  payload,
}: {
  id: string;
  payload: CinemaFormValues;
}) => {
  const { data } = await api.put(`/cinema/${id}`, payload);

  return data;
};

export const deleteCinema = async (id: string) => {
  const { data } = await api.delete(`/cinema/${id}`);

  return data;
};

export const getTrashCinemas = async () => {
  const response = await api.get("/cinema/trash");

  return response.data;
};

export const restoreCinema = async (id: string) => {
  const response = await api.patch(`/cinema/${id}/restore`);

  return response.data;
};
