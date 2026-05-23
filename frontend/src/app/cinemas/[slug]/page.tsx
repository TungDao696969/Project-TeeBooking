"use client";

import { useParams } from "next/navigation";

import CinemaHero from "@/components/cinema/cinema-hero";
import CinemaTabs from "@/components/cinema/cinema-tabs";

import { useCinemaDetail } from "@/hooks/use-cinema-detail";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MovieCard from "@/components/cinema/movie-card";
import { useCinemaShowtimes } from "@/hooks/use-cinema-showtimes";
import { useMemo, useState } from "react";
import CinemaMovieNavbar from "./CinemaMovieNavbar";

type MovieTab = "now_showing" | "coming_soon" | "special_showtime" | "ticket_price";

export default function CinemaDetailPage() {
  const params = useParams();

  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<MovieTab>("now_showing");

  const { data: cinema, isLoading } = useCinemaDetail(slug);
  const {
    data = [],
    isLoading: isShowtimesLoading,
    isFetching: isShowtimesFetching,
  } = useCinemaShowtimes(slug, activeTab === "now_showing");

  const movieCounts = useMemo(
    () => ({
      nowShowingCount: data.filter((item) => item.movie.status === "now_showing")
        .length,
      comingSoonCount: data.filter((item) => item.movie.status === "coming_soon")
        .length,
      specialShowtimeCount: 0,
    }),
    [data]
  );

  const filteredMovies = useMemo(() => {
    if (activeTab === "now_showing" || activeTab === "coming_soon") {
      return data.filter((item) => item.movie.status === activeTab);
    }

    return [];
  }, [activeTab, data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071226] text-white">
        Loading...
      </div>
    );
  }

  if (!cinema) return null;

  return (
    <div className="min-h-screen bg-[#071226] text-white">
      <Header />
      <CinemaHero cinema={cinema} />
      <CinemaMovieNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={movieCounts}
      />
      <div className="mx-auto max-w-7xl space-y-8 mb-10 mt-10">
        {isShowtimesLoading || isShowtimesFetching ? (
          <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
            Đang tải lịch chiếu...
          </div>
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((item) => (
            <MovieCard key={item.movie.id} item={item} />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
            Không có phim phù hợp.
          </div>
        )}
      </div>

      <section className="mx-auto max-w-[1320px] px-4 py-14">
        <CinemaTabs cinema={cinema} />
      </section>

      <Footer />
    </div>
  );
}
