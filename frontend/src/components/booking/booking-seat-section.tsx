"use client";

import { useSeats } from "@/hooks/seat/useSeats";
import SeatLegend from "./seat/seat-legend";
import SeatMap from "./seat/seat-map";
import BookingSeatCleanup from "./booking-seat-cleanup";

interface Props {
  showtimeId: string;
}

export default function BookingSeatSection({ showtimeId }: Props) {
  const { data, isLoading } = useSeats(showtimeId);

  const seatRows = data?.data?.seatRows ?? [];

  return (
    <>
      <BookingSeatCleanup />
      <div className="lg:col-span-2">
        <div className="mb-10">
          <p className="mt-2 text-center text-muted-foreground text-4xl font-bold text-white">
            CHỌN GHẾ
          </p>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-[#0b1020]/80 text-sm text-white/50">
              Đang tải sơ đồ ghế...
            </div>
          ) : (
            <SeatMap seatRows={seatRows} />
          )}
        </div>

        <div className="mt-10">
          <SeatLegend />
        </div>
      </div>
    </>
  );
}
