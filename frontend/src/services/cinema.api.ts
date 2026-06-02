import api from "@/lib/axios";
import {
  CinemaDetail,
  CinemaDetailResponse,
  CinemaMovie,
  CinemaShowtimeResponse,
  CinemasResponse,
} from "@/types/cinema.type";
import { Cinema } from "@/types/cinema.type";
export const getCinemas = async (): Promise<Cinema[]> => {
  const response = await api.get<CinemasResponse>("/cinema");

  return response.data.data;
};

export const getCinemaDetail = async (slug: string): Promise<CinemaDetail> => {
  const response = await api.get<CinemaDetailResponse>(`/cinema/${slug}`);

  return response.data.data;
};

export const getCinemaShowtimes = async (
  slug: string,
): Promise<CinemaMovie[]> => {
  const response = await api.get<CinemaShowtimeResponse>(
    `/cinema/${slug}/showtimes`,
  );

  return response.data.data;
};
