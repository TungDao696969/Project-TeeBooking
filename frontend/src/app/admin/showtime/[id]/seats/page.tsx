"use client";

import { useParams, useRouter } from "next/navigation";
import { Clock, Building2, Calendar } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import SeatLayout from "@/components/admin/showtime/seat-layout";
import SeatStatistics from "@/components/admin/showtime/seat-statistics";
import { useShowtimeSeats } from "@/hooks/admin/showtime/useShowtimeSeats";
export default function ShowtimeSeatsPage() {
  const params = useParams();
  const showtimeId = params.id as string;
  const { data, isLoading } = useShowtimeSeats(showtimeId);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#0b1633] text-white/50">
        <span className="animate-pulse">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#0b1633] text-white/50">
        Không có dữ liệu
      </div>
    );
  }

  return (
    <div className="space-y-5 p-6 bg-[#0b1633] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white">Sơ đồ ghế ngồi</h1>

        {/* BACK BUTTON */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="
            inline-flex items-center gap-2
            rounded-md border border-white/10
            bg-white/5
            px-4 py-2
            text-sm font-medium text-white/70
            transition-colors
            hover:bg-white/10
            hover:text-white
          "
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại
          </button>
        </div>
      </div>

      {/* Movie info */}
      <div className="bg-[#0b1633] border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-16 rounded-md bg-[#e8192c] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl">🎬</span>
        </div>
        <div className="space-y-1">
          <h2 className="font-semibold text-base text-white">
            {data.showtime.movie.title}
          </h2>
          <p className="text-sm text-white/50 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            {data.showtime.cinema.name} – {data.showtime.room.name}
          </p>
          <p className="text-sm text-white/50 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {data.showtime.date}
          </p>
          <span className="inline-flex items-center gap-1.5 bg-[#e8192c]/10 text-[#e8192c] text-xs font-medium px-2.5 py-1 rounded-full border border-[#e8192c]/30 mt-1">
            <Clock className="w-3 h-3" />
            {data.showtime.startTime} – {data.showtime.endTime}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <SeatStatistics
        total={data.statistics.totalSeats}
        available={data.statistics.availableSeats}
        booked={data.statistics.bookedSeats}
        locked={data.statistics.lockedSeats}
      />

      {/* Seat layout */}
      <div className="bg-[#0b1633] border border-white/10 rounded-xl p-6">
        <div className="bg-white/5 text-center py-2.5 rounded-md text-xs font-semibold tracking-[0.15em] text-white/40 mb-6">
          MÀN HÌNH
        </div>
        <div className="flex justify-center">
          <SeatLayout rows={data.seatRows} />
        </div>
      </div>
    </div>
  );
}
