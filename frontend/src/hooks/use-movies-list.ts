import { useQuery } from "@tanstack/react-query";
import { getMoviesList, MovieListParams } from "@/services/movies.api";

export const useMoviesList = (params: MovieListParams) => {
  return useQuery({
    queryKey: ["movies-list", params],
    queryFn: () => getMoviesList(params),
    staleTime: 1000 * 60 * 5,
  });
};
