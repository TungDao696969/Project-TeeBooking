"use client";

import Image from "next/image";
import { Film, Clock, Globe, MessageSquare, User } from "lucide-react";

import { CinemaMovie } from "@/types/cinema.type";

import ShowtimeGroup from "./showtime-group";

interface Props {
  item: CinemaMovie;
}

function getAgeWarningText(ageRating: string) {
  if (!ageRating) return "";
  const rating = ageRating.toUpperCase();
  if (rating.includes("T18")) {
    return "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)";
  }
  if (rating.includes("T16")) {
    return "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)";
  }
  if (rating.includes("T13")) {
    return "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)";
  }
  if (rating.includes("P")) {
    return "P: Phim dành cho mọi đối tượng khán giả";
  }
  return `${rating}: Phim dành cho đối tượng theo quy định`;
}

export default function MovieCard({ item }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] w-full sm:w-[220px] shrink-0 overflow-hidden rounded-2xl shadow-xl border border-white/5">
        <Image
          src={item.movie.posterUrl}
          alt={item.movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 220px"
          priority
        />
      </div>

      {/* Movie Details & Showtimes */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-wide leading-tight">
          {item.movie.title} {item.movie.ageRating ? `(${item.movie.ageRating})` : ""}
        </h2>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs md:text-sm text-gray-300 font-semibold">
          <div className="flex items-center gap-1.5">
            <Film className="h-4 w-4 text-yellow-400 shrink-0" />
            <span>{item.movie.genres.join(" / ")}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-yellow-400 shrink-0" />
            <span>{item.movie.durationMinutes} phút</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-yellow-400 shrink-0" />
            <span>{item.movie.country}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-yellow-400 shrink-0" />
            <span>VN</span>
          </div>
        </div>

        {/* Age Warning */}
        {item.movie.ageRating && (
          <div className="mt-3 flex items-start gap-2 text-xs md:text-sm text-gray-400 leading-snug">
            <User className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
            <span>{getAgeWarningText(item.movie.ageRating)}</span>
          </div>
        )}

        {/* Showtimes accordions list */}
        <div className="mt-6 space-y-4">
          {item.dates.map((date) => (
            <ShowtimeGroup key={date.date} date={date} />
          ))}
        </div>
      </div>
    </div>
  );
}
