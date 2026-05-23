import { useQuery } from "@tanstack/react-query";

import { getMovieDetail } from "@/services/movies.api";

export const useMovieDetail = (slug: string) => {
  return useQuery({
    queryKey: ["movie-detail", slug],
    queryFn: () => getMovieDetail(slug),
    enabled: !!slug,
  });
};
