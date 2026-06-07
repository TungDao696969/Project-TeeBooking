"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Cinema } from "@/types/home.type";
import { useCinemas } from "@/hooks/cinema/use-cinema";
import Link from "next/link";
interface Props {
  cinemas: Cinema[];
}

export default function CinemaSection({ cinemas }: Props) {
  const ITEMS_PER_PAGE = 6;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Total pages
  const totalPages = Math.ceil(cinemas.length / ITEMS_PER_PAGE);

  // Current cinemas
  const visibleCinemas = cinemas.slice(
    currentIndex * ITEMS_PER_PAGE,
    currentIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  // Next
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Prev
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const { data, isLoading } = useCinemas();
  return (
    <section className="py-12">
      {/* Title */}
      <div className="mb-10 flex items-center justify-center">
        <h2 className="text-center text-3xl font-extrabold uppercase italic text-white md:text-4xl">
          Hệ Thống Rạp
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCinemas.map((cinema) => (
            <div
              key={cinema.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1E1A5E] p-5 transition-all duration-300 hover:border-yellow-400/60 hover:bg-[#252175]"
            >
              {/* Top line */}
              <div className="absolute left-0 top-0 h-1 w-0 rounded-t-2xl bg-yellow-400 transition-all duration-300 group-hover:w-full" />

              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-400">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c-4 0-6 2-6 3v1h12v-1c0-1-2-3-6-3z" />
                    </svg>
                  </div>

                  {/* Name */}
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

              {/* Button */}
              <div className="mt-5">
                <Link
                  key={cinema.id}
                  href={`/cinemas/${cinema.slug}`}
                  className="group"
                >
                  <button className="w-full rounded-lg border border-yellow-400/40 bg-yellow-400/10 py-2.5 text-xs font-extrabold uppercase tracking-wider text-yellow-400 transition-all hover:bg-yellow-400 hover:text-black">
                    Đặt Vé Tại Rạp
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 text-white transition hover:scale-110"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 text-white transition hover:scale-110"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition ${
              currentIndex === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* View More */}
      <div className="mt-6 flex items-center justify-center">
        <Link href="/cinemas">
          <Button
            variant="outline"
            className="
        rounded-md
        border-2
        border-yellow-400
        bg-transparent
        px-16
        py-5
        text-base
        font-extrabold
        uppercase
        tracking-widest
        text-yellow-400
        hover:bg-yellow-400/10
        hover:text-yellow-300
      "
          >
            Xem Thêm
          </Button>
        </Link>
      </div>
    </section>
  );
}
