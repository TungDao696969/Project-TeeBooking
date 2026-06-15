import api from "@/lib/axios";
import { ICity } from "@/types/city.type";

interface CityResponse {
  success: boolean;
  message: string;
  data: ICity[];
}

interface CityDetailResponse {
  success: boolean;
  message: string;
  data: ICity;
}

export const getCities = async () => {
  const { data } = await api.get<CityResponse>("/city");
  return data.data;
};

export const getCityById = async (id: string) => {
  const { data } = await api.get<CityDetailResponse>(`/city/${id}`);
  return data.data;
};

export const createCity = async (payload: { name: string; slug: string; isActive?: boolean }) => {
  const { data } = await api.post<CityDetailResponse>("/city", payload);
  return data.data;
};

export const updateCity = async ({
  id,
  payload,
}: {
  id: string;
  payload: { name?: string; slug?: string; isActive?: boolean };
}) => {
  const { data } = await api.put<CityDetailResponse>(`/city/${id}`, payload);
  return data.data;
};

export const deleteCity = async (id: string) => {
  const { data } = await api.delete(`/city/${id}`);
  return data;
};
