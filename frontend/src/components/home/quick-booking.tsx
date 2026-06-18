"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "@/services/movies.api";
import dayjs from "dayjs";
import { useAuthStore } from "@/store/auth.store";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Movie {
  id: string;
  title: string;
  slug: string;
}

interface Props {
  movies: Movie[];
}

export default function QuickBooking({ movies = [] }: Props) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [selectedMovieSlug, setSelectedMovieSlug] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState("");

  const { data: cinemaShowtimes, isLoading } = useQuery({
    queryKey: ["movie-showtimes", selectedMovieSlug],
    queryFn: () => getMovieShowtimes(selectedMovieSlug),
    enabled: !!selectedMovieSlug,
  });

  const cinemas = cinemaShowtimes?.map((c) => c.cinema) || [];

  const selectedCinemaData = cinemaShowtimes?.find(
    (c) => c.cinema.id === selectedCinemaId,
  );
  const dates = selectedCinemaData?.dates || [];

  const selectedDateData = dates.find((d) => d.date === selectedDate);
  const showtimes = selectedDateData?.showtimes || [];

  const handleMovieChange = (slug: string) => {
    setSelectedMovieSlug(slug);
    setSelectedCinemaId("");
    setSelectedDate("");
    setSelectedShowtimeId("");
  };

  const handleCinemaChange = (cinemaId: string) => {
    setSelectedCinemaId(cinemaId);
    setSelectedDate("");
    setSelectedShowtimeId("");
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedShowtimeId("");
  };

  const handleShowtimeChange = (showtimeId: string) => {
    setSelectedShowtimeId(showtimeId);
  };

  const handleBook = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (selectedShowtimeId) {
      router.push(`/booking/${selectedShowtimeId}`);
    }
  };

  const selectContentClass =
    "bg-[#2d1b6e] border border-purple-400/60 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-1.5 mt-1";

  const selectItemClass =
    "text-purple-200 text-sm font-medium rounded-lg px-3 py-2.5 cursor-pointer " +
    "focus:bg-purple-500/25 focus:text-white " +
    "data-[highlighted]:bg-purple-500/25 data-[highlighted]:text-white " +
    "transition-colors duration-100";

  return (
    <section className="w-full mt-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 rounded-md bg-[#E5E7EE] px-6 py-4 lg:flex-row">
        {/* Title */}
        <div className="shrink-0">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-[#3A2A1E] whitespace-nowrap">
            Đặt Vé Nhanh
          </h2>
        </div>

        {/* Selects */}
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:flex-wrap xl:flex-nowrap">
          {/* Chọn phim */}
          <div className="min-w-0 flex-1">
            <Select value={selectedMovieSlug} onValueChange={handleMovieChange}>
              <SelectTrigger className="h-12 w-full rounded-xl border border-gray-400 bg-white text-sm font-bold text-[#6A35A6] truncate">
                <SelectValue placeholder="1. Chọn Phim" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {movies.map((movie) => (
                  <SelectItem
                    key={movie.id}
                    value={movie.slug}
                    className={selectItemClass}
                  >
                    {movie.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Chọn rạp */}
          <div className="min-w-0 flex-1">
            <Select
              value={selectedCinemaId}
              onValueChange={handleCinemaChange}
              disabled={!selectedMovieSlug || isLoading || cinemas.length === 0}
            >
              <SelectTrigger
                className="
    h-12 w-full rounded-xl border border-gray-400
    bg-white text-sm font-bold text-[#6A35A6]
    disabled:opacity-100
    disabled:cursor-not-allowed
    truncate
  "
              >
                <SelectValue
                  placeholder={
                    isLoading
                      ? "Đang tải rạp..."
                      : cinemas.length === 0 && selectedMovieSlug
                        ? "Không có rạp"
                        : "2. Chọn Rạp"
                  }
                />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {cinemas.map((cinema) => (
                  <SelectItem
                    key={cinema.id}
                    value={cinema.id}
                    className={selectItemClass}
                  >
                    {cinema.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Chọn ngày */}
          <div className="min-w-0 flex-1">
            <Select
              value={selectedDate}
              onValueChange={handleDateChange}
              disabled={!selectedCinemaId || dates.length === 0}
            >
              <SelectTrigger
                className="
    h-12 w-full rounded-xl border border-gray-400
    bg-white text-sm font-bold text-[#6A35A6]
    disabled:opacity-100
    disabled:cursor-not-allowed
    truncate
  "
              >
                <SelectValue
                  placeholder={
                    dates.length === 0 && selectedCinemaId
                      ? "Không có ngày"
                      : "3. Chọn Ngày"
                  }
                />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {dates.map((d) => (
                  <SelectItem
                    key={d.date}
                    value={d.date}
                    className={selectItemClass}
                  >
                    {dayjs(d.date).format("DD/MM/YYYY")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Chọn suất */}
          <div className="min-w-0 flex-1">
            <Select
              value={selectedShowtimeId}
              onValueChange={handleShowtimeChange}
              disabled={!selectedDate || showtimes.length === 0}
            >
              <SelectTrigger
                className="
    h-12 w-full rounded-xl border border-gray-400
    bg-white text-sm font-bold text-[#6A35A6]
    disabled:opacity-100
    disabled:cursor-not-allowed
    truncate
  "
              >
                <SelectValue
                  placeholder={
                    showtimes.length === 0 && selectedDate
                      ? "Không có suất"
                      : "4. Chọn Suất"
                  }
                />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {showtimes.map((showtime) => (
                  <SelectItem
                    key={showtime.id}
                    value={showtime.id}
                    className={selectItemClass}
                  >
                    {dayjs(showtime.startTime).format("HH:mm")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={handleBook}
          disabled={!selectedShowtimeId}
          className="h-14 rounded-xl bg-[#6A35A6] px-8 text-lg font-extrabold uppercase hover:bg-[#582c8d] disabled:opacity-100 disabled:cursor-not-allowed"
        >
          Đặt Ngay
        </Button>
      </div>
    </section>
  );
}
