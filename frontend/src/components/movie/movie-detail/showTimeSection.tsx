"use client";

import { useState } from "react";
import {
  CalendarOff,
  Bell,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Ticket,
  Film,
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
      const date = new Date(s.showDate).toLocaleDateString("vi-VN");
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
      <section className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
          <Calendar className="h-5 w-5 text-yellow-400" />
          <h2 className="text-base font-bold uppercase tracking-widest text-white">
            Lịch Chiếu
          </h2>
          <span className="ml-auto rounded-full bg-yellow-400/15 px-3 py-1 text-xs font-semibold text-yellow-300">
            Sắp chiếu
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="rounded-full bg-white/5 p-4">
            <CalendarOff className="h-8 w-8 text-white/30" />
          </div>
          <p className="text-base font-medium text-white/70">
            Chưa có suất chiếu nào được mở bán
          </p>
          <p className="text-sm text-white/50">
            Dự kiến khởi chiếu:{" "}
            <span className="font-semibold text-white/70">
              {new Date(releaseDate).toLocaleDateString("vi-VN")}
            </span>
          </p>

          <button
            onClick={() => setNotified(true)}
            disabled={notified}
            className={`mt-4 flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition
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
    <section className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <Ticket className="h-5 w-5 text-yellow-400" />
        <h2 className="text-base font-bold uppercase tracking-widest text-white">
          Chọn Suất Chiếu
        </h2>
        <span className="ml-auto rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
          Đang chiếu
        </span>
      </div>

      {/* Chọn ngày */}
      <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex-shrink-0 rounded-lg px-5 py-3 text-sm font-semibold transition
              ${
                activeDateKey === date
                  ? "bg-yellow-400 text-[#081733] shadow-lg shadow-yellow-400/30"
                  : "border border-white/15 text-white/70 hover:border-white/30 hover:bg-white/5 hover:text-white"
              }`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Suất chiếu theo ngày */}
      <div className="space-y-3">
        {activeShowtimes.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Film className="h-8 w-8 text-white/20" />
            <p className="text-sm text-white/50">Không có suất chiếu nào</p>
          </div>
        ) : (
          activeShowtimes.map((s) => {
            const startDateTime = new Date(s.startTime);
            const endDateTime = new Date(s.endTime);
            const startTimeStr = startDateTime.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const endTimeStr = endDateTime.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={s.id}
                className={`group flex flex-col gap-4 rounded-lg border px-5 py-4 transition
                  ${
                    !s.isActive
                      ? "border-white/5 opacity-50"
                      : "border-white/10 hover:border-yellow-400/30 hover:bg-white/5"
                  }`}
              >
                {/* Header: Format, Language, Subtitle */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md bg-blue-500/20 px-2 py-1 text-xs font-semibold text-blue-300">
                    {s.format}
                  </span>
                  <span className="inline-flex rounded-md bg-purple-500/20 px-2 py-1 text-xs font-semibold text-purple-300">
                    {s.language}
                  </span>
                  <span className="inline-flex rounded-md bg-pink-500/20 px-2 py-1 text-xs font-semibold text-pink-300">
                    Phụ đề: {s.subtitle}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex items-center justify-between">
                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-400/10 p-3">
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">
                        {startTimeStr}
                      </p>
                      <p className="text-xs text-white/50">
                        Kết thúc: {endTimeStr}
                      </p>
                    </div>
                  </div>

                  {/* Room info */}
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-white/50">
                      Phòng
                    </p>
                    <p className="text-sm font-bold text-white">
                      {s.room?.name || `Phòng ${s.roomId.slice(0, 8)}`}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-white/50">
                      Giá từ
                    </p>
                    <p className="text-lg font-bold text-yellow-400">
                      {(s.basePrice ?? 0).toLocaleString("vi-VN")}đ
                    </p>
                  </div>

                  {/* Book button */}
                  <button
                    disabled={!s.isActive}
                    className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition
                      ${
                        !s.isActive
                          ? "cursor-not-allowed bg-white/5 text-white/20"
                          : "bg-red-600 text-white hover:bg-red-500 active:scale-95"
                      }`}
                  >
                    Đặt vé
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Cinema info if available */}
                {s.cinema && (
                  <div className="flex items-center gap-2 border-t border-white/5 pt-3 text-xs text-white/60">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{s.cinema.name}</span>
                    <span className="text-white/30">•</span>
                    <span className="truncate">{s.cinema.address}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
