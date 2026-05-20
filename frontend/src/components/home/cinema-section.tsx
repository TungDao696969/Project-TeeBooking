"use client";

import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { Cinema } from "@/types/home.type";

export default function CinemaSection({ cinemas }: { cinemas: Cinema[] }) {
  return (
    <section className="py-10">
      {/* Title */}
      <h2 className="mb-8 text-3xl font-extrabold uppercase italic text-white md:text-4xl">
        Hệ Thống Rạp
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="group relative overflow-hidden rounded-2xl bg-[#1E1A5E] border border-white/10 p-5 transition-all duration-300 hover:border-yellow-400/60 hover:bg-[#252175] cursor-pointer"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full rounded-t-2xl" />

            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c-4 0-6 2-6 3v1h12v-1c0-1-2-3-6-3z" />
                  </svg>
                </div>

                <h3 className="text-base font-extrabold uppercase leading-tight text-white">
                  {cinema.name}
                </h3>
              </div>

              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-yellow-400" />
            </div>

            {/* Divider */}
            <div className="mb-4 h-px bg-white/10" />

            {/* Info */}
            <div className="space-y-2.5">
              {/* Address */}
              {cinema.address && (
                <div className="flex items-start gap-2.5 text-sm text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400/70" />
                  <span className="line-clamp-2 leading-snug">
                    {cinema.address}
                  </span>
                </div>
              )}

              {/* Phone */}
              {cinema.hotline && (
                <div className="flex items-center gap-2.5 text-sm text-white/70">
                  <Phone className="h-4 w-4 shrink-0 text-yellow-400/70" />
                  <span>{cinema.hotline}</span>
                </div>
              )}

              {/* Hours */}
              {cinema.openingHours && (
                <div className="flex items-center gap-2.5 text-sm text-white/70">
                  <Clock className="h-4 w-4 shrink-0 text-yellow-400/70" />
                  <span>{cinema.openingHours}</span>
                </div>
              )}
            </div>

            {/* Book button */}
            <div className="mt-5">
              <button className="w-full rounded-lg border border-yellow-400/40 bg-yellow-400/10 py-2.5 text-xs font-extrabold uppercase tracking-wider text-yellow-400 transition-all hover:bg-yellow-400 hover:text-black">
                Đặt Vé Tại Rạp
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
