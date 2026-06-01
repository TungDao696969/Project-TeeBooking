import { useQuery } from "@tanstack/react-query";
import { movieAdminService } from "@/services/admin/movie.service";

export const useMovieById = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],

    queryFn: () => movieAdminService.getMovieById(id),

    enabled: !!id,
  });
};
