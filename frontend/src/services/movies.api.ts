import api from "@/lib/axios";
import { Movie } from "@/types/movie.type";
export const getMovieDetail = async (slug: string): Promise<Movie> => {
  const response = await api.get(`/movies/detail/${slug}`);

  return response.data.data;
};
