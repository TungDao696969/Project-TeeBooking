import { useMemo } from "react";
import dayjs from "dayjs";
import { useCinemaShowtimes } from "@/hooks/cinema/use-cinema-showtimes";
import { Calendar, Film, MapPin } from "lucide-react";
import { Cinema, CinemaMovie } from "@/types/cinema.type";

interface ShowtimeFilterBarProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedCinemaSlug: string;
  setSelectedCinemaSlug: (slug: string) => void;
  selectedMovieSlug: string;
  setSelectedMovieSlug: (slug: string) => void;
  cinemas: Cinema[];
  isLoadingCinemas: boolean;
}

export default function ShowtimeFilterBar({
  selectedDate,
  setSelectedDate,
  selectedCinemaSlug,
  setSelectedCinemaSlug,
  selectedMovieSlug,
  setSelectedMovieSlug,
  cinemas,
  isLoadingCinemas,
}: ShowtimeFilterBarProps) {
  // Generate 7 days starting from today
  const dates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      const d = dayjs().add(i, "day");
      let label = d.format("DD/MM");
      if (i === 0) label = `Hôm Nay ${label}`;
      else label = `${d.format("dddd")} ${label}`
        .replace("Monday", "Thứ 2")
        .replace("Tuesday", "Thứ 3")
        .replace("Wednesday", "Thứ 4")
        .replace("Thursday", "Thứ 5")
        .replace("Friday", "Thứ 6")
        .replace("Saturday", "Thứ 7")
        .replace("Sunday", "Chủ Nhật");

      list.push({
        value: d.format("YYYY-MM-DD"),
        label,
      });
    }
    return list;
  }, []);

  // Fetch showtimes for the selected cinema to extract unique movies
  const { data: showtimes = [] } = useCinemaShowtimes(
    selectedCinemaSlug,
    !!selectedCinemaSlug
  );

  const movies = useMemo(() => {
    // Only extract movies that are "now_showing"
    const movieMap = new Map();
    showtimes.forEach((item: CinemaMovie) => {
      if (item.movie && item.movie.status === "now_showing") {
        if (!movieMap.has(item.movie.slug)) {
          movieMap.set(item.movie.slug, item.movie);
        }
      }
    });
    return Array.from(movieMap.values());
  }, [showtimes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. Ngày */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-yellow-400 font-bold text-lg border-b border-white/20 pb-2">
          <span>1. Ngày</span>
          <Calendar className="w-5 h-5" />
        </div>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-[#E5E7EB] text-black rounded-md py-3 px-4 outline-none font-semibold cursor-pointer appearance-none mt-2"
        >
          {dates.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Phim */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-yellow-400 font-bold text-lg border-b border-white/20 pb-2">
          <span>2. Phim</span>
          <Film className="w-5 h-5" />
        </div>
        <select
          value={selectedMovieSlug}
          onChange={(e) => setSelectedMovieSlug(e.target.value)}
          className="w-full bg-[#E5E7EB] text-black rounded-md py-3 px-4 outline-none font-semibold cursor-pointer appearance-none mt-2"
        >
          <option value="all">Chọn Phim</option>
          {movies.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.title}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Rạp */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-yellow-400 font-bold text-lg border-b border-white/20 pb-2">
          <span>3. Rạp</span>
          <MapPin className="w-5 h-5" />
        </div>
        <select
          value={selectedCinemaSlug}
          onChange={(e) => {
            setSelectedCinemaSlug(e.target.value);
            // Reset movie selection when cinema changes
            setSelectedMovieSlug("all");
          }}
          disabled={isLoadingCinemas}
          className="w-full bg-[#E5E7EB] text-black rounded-md py-3 px-4 outline-none font-semibold cursor-pointer appearance-none mt-2 disabled:opacity-50"
        >
          {isLoadingCinemas ? (
            <option value="">Đang tải...</option>
          ) : (
            <>
              {cinemas.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </div>
  );
}
