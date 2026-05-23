"use client";

import { useState } from "react";
import {
  CalendarOff,
  Bell,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { ShowtimeSectionProps, Showtime } from "@/types/movie.type";

export default function ShowtimeSection({
  showtimes = [],
  status,
  releaseDate,
}: ShowtimeSectionProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notified, setNotified] = useState(false);

  // Trạng thái: chưa mở vé
  const isComingSoon =
    status === "coming_soon" || (showtimes ?? []).length === 0;
  // Nhóm suất chiếu theo ngày

  const groupedByDate = showtimes.reduce<Record<string, Showtime[]>>(
    (acc, s) => {
      const date = new Date(s.date).toLocaleDateString("vi-VN");
      if (!acc[date]) acc[date] = [];
      acc[date].push(s);
      return acc;
    },
    {},
  );

  const dates = Object.keys(groupedByDate);
  const activeDateKey = selectedDate ?? dates[0] ?? null;
  const activeShowtimes = activeDateKey
    ? (groupedByDate[activeDateKey] ?? [])
    : [];

  if (isComingSoon) {
    return (
      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
          <Calendar className="h-5 w-5 text-yellow-400" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Lịch Chiếu
          </h2>
          <span className="ml-auto rounded-full bg-yellow-400/15 px-3 py-0.5 text-xs font-semibold text-yellow-300">
            Sắp chiếu
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <CalendarOff className="h-10 w-10 text-white/20" />
          <p className="text-sm font-medium text-white/70">
            Chưa có suất chiếu nào được mở bán
          </p>
          <p className="text-xs text-white/40">
            Dự kiến khởi chiếu:{" "}
            <span className="text-white/60">
              {new Date(releaseDate).toLocaleDateString("vi-VN")}
            </span>
          </p>

          <button
            onClick={() => setNotified(true)}
            disabled={notified}
            className={`mt-3 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition
              ${
                notified
                  ? "cursor-default bg-green-500/20 text-green-400"
                  : "bg-yellow-400 text-[#081733] hover:bg-yellow-300 active:scale-95"
              }`}
          >
            <Bell className="h-4 w-4" />
            {notified ? "Đã đăng ký thông báo!" : "Nhận thông báo khi mở vé"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
        <Calendar className="h-5 w-5 text-yellow-400" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          Lịch Chiếu
        </h2>
        <span className="ml-auto rounded-full bg-green-500/15 px-3 py-0.5 text-xs font-semibold text-green-400">
          Đang chiếu
        </span>
      </div>

      {/* Chọn ngày */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex-shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition
              ${
                activeDateKey === date
                  ? "bg-yellow-400 text-[#081733]"
                  : "border border-white/15 text-white/70 hover:border-yellow-400/40 hover:text-white"
              }`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Suất chiếu theo ngày */}
      <div className="space-y-3">
        {activeShowtimes.map((s) => {
          const occupancy = Math.round(
            (1 - s.availableSeats / s.totalSeats) * 100,
          );
          const isFull = s.availableSeats === 0;

          return (
            <div
              key={s.id}
              className={`flex items-center gap-4 rounded-lg border px-4 py-3 transition
                ${
                  isFull
                    ? "border-white/5 opacity-50"
                    : "border-white/10 hover:border-yellow-400/30 hover:bg-white/5"
                }`}
            >
              {/* Rạp */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {s.cinema.name}
                </p>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-white/50">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{s.cinema.address}</span>
                </div>
              </div>

              {/* Giờ */}
              <div className="flex items-center gap-1 text-sm font-bold text-yellow-300">
                <Clock className="h-3.5 w-3.5" />
                {s.startTime}
              </div>

              {/* Còn chỗ */}
              <div className="text-right">
                <p
                  className={`text-xs font-semibold ${isFull ? "text-red-400" : "text-green-400"}`}
                >
                  {isFull ? "Hết vé" : `Còn ${s.availableSeats} chỗ`}
                </p>
                <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${isFull ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${occupancy}%` }}
                  />
                </div>
              </div>

              {/* Giá + nút */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-white/50">
                  {s.price.toLocaleString("vi-VN")}đ
                </span>
                <button
                  disabled={isFull}
                  className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-bold transition
                    ${
                      isFull
                        ? "cursor-not-allowed bg-white/5 text-white/20"
                        : "bg-red-600 text-white hover:bg-red-500 active:scale-95"
                    }`}
                >
                  Đặt vé <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
