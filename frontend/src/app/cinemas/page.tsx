"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useCinemas } from "@/hooks/cinema/use-cinema";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CinemasPage() {
  const { data: cinemas = [], isLoading, isError } = useCinemas();

  return (
    <div className="min-h-screen bg-[#071226] text-white">
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 py-10 mt-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 font-semibold mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-yellow-400 transition">
            Trang Chủ
          </Link>
          <span>&gt;</span>
          <span className="text-yellow-400">Hệ Thống Rạp</span>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="inline-block text-3xl md:text-4xl font-black uppercase tracking-widest text-white border-b-4 border-yellow-400 pb-3 italic">
            Hệ Thống Rạp
          </h1>
        </div>

        {/* Loading / Error States */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-400"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Không thể tải dữ liệu hệ thống rạp.
          </div>
        ) : cinemas.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Hiện tại chưa có rạp nào trong hệ thống.
          </div>
        ) : (
          /* Grid of Cinemas */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cinemas.map((cinema) => (
              <div
                key={cinema.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1E1A5E] p-6 transition-all duration-300 hover:border-yellow-400/60 hover:bg-[#252175] flex flex-col justify-between h-full"
              >
                {/* Top line indicator */}
                <div className="absolute left-0 top-0 h-1 w-0 rounded-t-2xl bg-yellow-400 transition-all duration-300 group-hover:w-full" />

                <div>
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
                      <h3 className="text-base md:text-lg font-extrabold uppercase leading-tight text-white group-hover:text-yellow-400 transition-colors">
                        {cinema.name}
                      </h3>
                    </div>

                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-yellow-400" />
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px bg-white/10" />

                  {/* Info */}
                  <div className="space-y-3">
                    {/* Address */}
                    {cinema.address && (
                      <div className="flex items-start gap-2.5 text-sm text-white/70">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400/70" />
                        <span className="leading-snug">
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
                </div>

                {/* Button */}
                <div className="mt-6">
                  <Link href={`/cinemas/${cinema.slug}`} className="block">
                    <button className="w-full rounded-lg border border-yellow-400/40 bg-yellow-400/10 py-3 text-xs font-extrabold uppercase tracking-wider text-yellow-400 transition-all hover:bg-yellow-400 hover:text-black">
                      Đặt Vé Tại Rạp
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
