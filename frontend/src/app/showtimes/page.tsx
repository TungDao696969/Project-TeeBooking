"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useCinemas } from "@/hooks/cinema/use-cinema";
import ShowtimeFilterBar from "@/components/showtimes/showtime-filter-bar";
import ShowtimeResults from "@/components/showtimes/showtime-results";

export default function ShowtimesPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );
  const [selectedCinemaSlug, setSelectedCinemaSlug] = useState<string>("");
  const [selectedMovieSlug, setSelectedMovieSlug] = useState<string>("all");

  const { data: cinemas = [], isLoading: isLoadingCinemas } = useCinemas();

  // Auto-select first cinema when loaded
  useEffect(() => {
    if (cinemas.length > 0 && !selectedCinemaSlug) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCinemaSlug(cinemas[0].slug);
    }
  }, [cinemas, selectedCinemaSlug]);

  return (
    <div className="min-h-screen bg-[#071226] text-white">
      <Header />

      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 py-10 mt-20">
        {/* Filter Bar */}
        <ShowtimeFilterBar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedCinemaSlug={selectedCinemaSlug}
          setSelectedCinemaSlug={setSelectedCinemaSlug}
          selectedMovieSlug={selectedMovieSlug}
          setSelectedMovieSlug={setSelectedMovieSlug}
          cinemas={cinemas}
          isLoadingCinemas={isLoadingCinemas}
        />

        {/* Results */}
        <div className="mt-12">
          {selectedCinemaSlug ? (
            <ShowtimeResults
              cinemaSlug={selectedCinemaSlug}
              selectedDate={selectedDate}
              selectedMovieSlug={selectedMovieSlug}
            />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
              Vui lòng chọn rạp để xem suất chiếu
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
