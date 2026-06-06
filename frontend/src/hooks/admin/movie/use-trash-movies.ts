import { useQuery } from "@tanstack/react-query";

import { getTrashMoviesService } from "@/services/admin/movie.service";

export const useTrashMovies = () => {
  return useQuery({
    queryKey: ["trash-movies"],
    queryFn: getTrashMoviesService,
  });
};
