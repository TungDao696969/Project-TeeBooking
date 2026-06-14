import { useMemo } from "react";
import { useCinemaShowtimes } from "@/hooks/cinema/use-cinema-showtimes";
import MovieCard from "@/components/cinema/movie-card";

interface ShowtimeResultsProps {
  cinemaSlug: string;
  selectedDate: string;
  selectedMovieSlug: string;
}

export default function ShowtimeResults({
  cinemaSlug,
  selectedDate,
  selectedMovieSlug,
}: ShowtimeResultsProps) {
  const {
    data: showtimes = [],
    isLoading,
    isFetching,
  } = useCinemaShowtimes(cinemaSlug);

  const filteredMovies = useMemo(() => {
    // 1. Filter out only movies that are currently showing
    let movies = showtimes.filter(
      (item) => item.movie && item.movie.status === "now_showing"
    );

    // 2. Filter by selected movie
    if (selectedMovieSlug !== "all") {
      movies = movies.filter((item) => item.movie.slug === selectedMovieSlug);
    }

    // 3. Filter by selected date
    movies = movies
      .map((item) => {
        const filteredDates = item.dates.filter(
          (d) => d.date === selectedDate
        );
        return {
          ...item,
          dates: filteredDates,
        };
      })
      .filter((item) => item.dates.length > 0); // Only keep movies that have showtimes on this date

    return movies;
  }, [showtimes, selectedDate, selectedMovieSlug]);

  if (isLoading || isFetching) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
        Đang tải lịch chiếu...
      </div>
    );
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
        Chưa có suất chiếu nào phù hợp với tìm kiếm của bạn.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
      {filteredMovies.map((item) => (
        <MovieCard key={item.movie.id} item={item} />
      ))}
    </div>
  );
}
