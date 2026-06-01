import { useQuery } from "@tanstack/react-query";
import { movieAdminService } from "@/services/admin/movie.service";

export const useMovies = (page: number) => {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: () => movieAdminService.getMovies(page),
    placeholderData: (previousData) => previousData,
  });
};
