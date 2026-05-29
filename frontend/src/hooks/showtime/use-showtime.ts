import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "@/services/movies.api";

export const useShowtime = (movieSlug: string) => {
  return useQuery({
    queryKey: ["movie-showtimes", movieSlug],

    queryFn: () => getMovieShowtimes(movieSlug),

    enabled: !!movieSlug,
  });
};
