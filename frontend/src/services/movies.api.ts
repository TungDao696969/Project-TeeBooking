import api from "@/lib/axios";
import { MovieDetailResponse } from "@/types/movie.type";
import { CinemaShowtime, ShowtimeResponse } from "@/types/showtime.type";
export const getMovieDetail = async (slug: string) => {
  const response = await api.get<MovieDetailResponse>(`/movies/detail/${slug}`);

  return response.data;
};

export const getMovieShowtimes = async (
  slug: string,
): Promise<CinemaShowtime[]> => {
  const response = await api.get<ShowtimeResponse>(`/movie/${slug}/showtimes`);

  return response.data.data;
};

export interface MovieListParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  status?: string;
  sortBy?: string;
  order?: string;
}

export const getMoviesList = async (params: MovieListParams) => {
  const response = await api.get("/movies/list", { params });
  return response.data;
};

