"use client";

import Link from "next/link";

import { CalendarDays, ChevronDown, MapPin } from "lucide-react";

import { useCinemaDropdown } from "@/store/cinema.store";
import { useCinemas } from "@/hooks/cinema/use-cinema";

export default function Navbar() {
  const { open, setOpen } = useCinemaDropdown();

  // PHẢI GỌI HOOK
  const { data: cinemas = [], isLoading } = useCinemas();

  return (
    <nav className="border-t border-white/10 bg-[#071226] text-white relative z-50">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex items-center gap-10 py-4">
          {/* CHỌN RẠP */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              suppressHydrationWarning
              className="flex items-center gap-2 font-medium transition hover:text-yellow-400"
            >
              <MapPin className="h-5 w-5" />
              Chọn rạp
              <ChevronDown
                className={`h-4 w-4 transition duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute left-0 top-full pt-5 transition-all duration-300 ${
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="w-[920px] rounded-2xl border border-white/10 bg-[#08142f] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                    {cinemas.map((cinema) => (
                      <Link
                        key={cinema.id}
                        href={`/cinemas/${cinema.slug}`}
                        className="group"
                      >
                        <div className="text-lg font-semibold text-white transition group-hover:text-yellow-400">
                          {cinema.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LỊCH CHIẾU */}
          <Link
            href="/showtimes"
            className="flex items-center gap-2 font-medium transition hover:text-yellow-400"
          >
            <CalendarDays className="h-5 w-5" />
            Lịch chiếu
          </Link>
        </div>

        {/* RIGHT */}
        <div className="hidden items-center gap-10 py-4 lg:flex">
          <Link
            href="/promotions"
            className="font-medium transition hover:text-yellow-400"
          >
            Khuyến mãi
          </Link>

          <Link
            href="#"
            className="font-medium transition hover:text-yellow-400"
          >
            Tổ chức sự kiện
          </Link>

          <Link
            href="#"
            className="font-medium transition hover:text-yellow-400"
          >
            Dịch vụ giải trí khác
          </Link>

          <Link
            href="#"
            className="font-medium transition hover:text-yellow-400"
          >
            Giới thiệu
          </Link>
        </div>
      </div>
    </nav>
  );
}
