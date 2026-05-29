"use client";

import Image from "next/image";

import dayjs from "dayjs";

import { MapPin, MonitorPlay, Clock3 } from "lucide-react";

import { ShowtimeDetail } from "@/types/booking.type";

interface Props {
  showtime: ShowtimeDetail;
}

export default function BookingHeader({ showtime }: Props) {
  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row">
      <Image
        src={showtime.movie.posterUrl}
        alt={showtime.movie.title}
        width={220}
        height={320}
        className="rounded-xl object-cover"
      />

      <div className="flex-1 text-white">
        <h1 className="text-5xl font-black uppercase">
          {showtime.movie.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <div className="rounded-md bg-yellow-400 px-3 py-1 font-bold text-black">
            T{showtime.movie.ageRating}
          </div>

          <div className="rounded-md border border-white/20 px-3 py-1">
            {showtime.format}
          </div>
        </div>

        <div className="mt-8 space-y-4 text-lg">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-yellow-300" />

            <span>{showtime.cinema.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <MonitorPlay className="h-5 w-5 text-yellow-300" />

            <span>{showtime.room.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-yellow-300" />

            <span>{dayjs(showtime.startTime).format("HH:mm DD/MM/YYYY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
