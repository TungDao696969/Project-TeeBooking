"use client";

import Image from "next/image";

import { CinemaMovie } from "@/types/cinema.type";

import ShowtimeGroup from "./showtime-group";

interface Props {
  item: CinemaMovie;
}

export default function MovieCard({ item }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B172E] p-6">
      <div className="flex gap-6">
        <Image
          src={item.movie.posterUrl}
          alt={item.movie.title}
          width={180}
          height={260}
          className="rounded-xl object-cover"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{item.movie.title}</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.movie.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-300">
            {item.movie.durationMinutes} phút
          </div>

          <div className="mt-8 space-y-6">
            {item.dates.map((date) => (
              <ShowtimeGroup key={date.date} date={date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
