"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { useTicketTypes } from "@/hooks/booking/use-ticket-types";
import { useBookingStore } from "@/store/booking.store";
import { useComboStore } from "@/store/combo.store";

import ReserveTimer from "@/components/booking/seat/reserve-timer";
import { useRouter } from "next/navigation";
export default function BookingSummary() {
  const params = useParams();
  const router = useRouter();
  const showtimeId = Array.isArray(params.showtimeId)
    ? params.showtimeId[0]
    : params.showtimeId;

  const { data } = useTicketTypes(showtimeId ?? "");

  const { selectedSeats, tickets } = useBookingStore();
  const { selectedCombos, getTotalPrice } = useComboStore();

  const showtime = data?.showtime;

  const ticketSummary = useMemo(() => {
    if (!data || tickets.length === 0) return "Chưa chọn vé";

    return tickets
      .map(({ ticketTypeId, quantity }) => {
        const ticketType = data.ticketTypes.find((t) => t.id === ticketTypeId);

        if (!ticketType) return null;

        return `${quantity}x ${ticketType.name}`;
      })
      .filter(Boolean)
      .join(", ");
  }, [data, tickets]);

  const seatSummary = useMemo(() => {
    if (selectedSeats.length === 0) return "Chưa chọn ghế";

    return selectedSeats.map((seat) => seat.seatCode).join(", ");
  }, [selectedSeats]);

  const comboSummary = useMemo(() => {
    if (selectedCombos.length === 0) return "Chưa chọn combo";

    return selectedCombos
      .map((item) => `${item.quantity}x ${item.combo.name}`)
      .join(", ");
  }, [selectedCombos]);

  const seatTotal = useMemo(() => {
    return selectedSeats.reduce(
      (sum, seat) => sum + seat.price + (seat.extraPrice ?? 0),
      0,
    );
  }, [selectedSeats]);

  const ticketTotal = useMemo(() => {
    if (!data) return 0;

    return tickets.reduce((total, item) => {
      const ticketType = data.ticketTypes.find(
        (t) => t.id === item.ticketTypeId,
      );

      if (!ticketType) return total;

      return total + Number(ticketType.price) * item.quantity;
    }, 0);
  }, [data, tickets]);

  const comboTotal = getTotalPrice();

  const finalTotal = seatTotal + ticketTotal + comboTotal;

  /**
   * Lấy thời gian giữ ghế mới nhất
   */
  const latestLockedUntil = useMemo(() => {
    const lockedSeats = selectedSeats.filter((seat) => seat.lockedUntil);

    if (lockedSeats.length === 0) return null;

    return lockedSeats
      .map((seat) => seat.lockedUntil as string)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
  }, [selectedSeats]);

  if (!showtime) return null;

  return (
    <div className="sticky bottom-0 z-50 border-t border-white/[0.07] bg-[#05080f]/95 backdrop-blur-xl">
      <div className="container mx-auto flex items-center gap-4 px-6 py-3">
        {/* Movie / Booking Info */}
        <div className="min-w-0 flex flex-1 flex-col justify-center">
          <h3 className="font-bebas truncate text-base leading-tight tracking-widest text-white md:text-lg">
            {showtime.movie.title}
          </h3>

          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-white/50">
            <span>
              {showtime.cinema.name} | {ticketSummary}
            </span>
          </div>

          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-white/50">
            <span>
              Phòng chiếu: {showtime.room.name} | {seatSummary} |{" "}
              {dayjs(showtime.startTime).format("HH:mm")}
            </span>
          </div>

          <div className="mt-0.5 text-xs text-white/50">{comboSummary}</div>
        </div>

        {/* Timer + Total + CTA */}
        <div className="flex flex-shrink-0 items-center gap-3">
          {/* Timer */}
          {latestLockedUntil && (
            <ReserveTimer lockedUntil={latestLockedUntil} />
          )}

          {/* Total + Button */}
          <div className="flex flex-col items-end gap-1">
            <div className="text-xs text-white/50 mb-1">
              Tạm tính:{" "}
              <span className="text-sm font-bold text-white">
                {finalTotal.toLocaleString("vi-VN")} VND
              </span>
            </div>

            <button
              disabled={finalTotal === 0}
              className="rounded-lg bg-yellow-400 px-6 py-2 font-bold text-lg tracking-[2px] text-black transition-all hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => {
                router.push(`/booking/${showtimeId}/payment`);
              }}
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
