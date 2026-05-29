"use client";

import clsx from "clsx";

import { Seat } from "@/types/seat.type";
import { useBookingStore } from "@/store/booking.store";
import { useReserveSeat } from "@/hooks/seat/use-reserve-seat";
import { useReleaseSeat } from "@/hooks/seat/use-release-seat";
interface Props {
  seat: Seat;
}

export default function SeatItem({ seat }: Props) {
  const { selectedSeats, toggleSeat, upsertSeat } = useBookingStore();
  const reserveSeatMutation = useReserveSeat();
  const releaseSeatMutation = useReleaseSeat();
  const isSelected = selectedSeats.some((s) => s.id === seat.id);

  const disabled =
    seat.status === "booked" ||
    seat.status === "locked" ||
    (seat.status === "reserved" && !isSelected) ||
    reserveSeatMutation.isPending ||
    releaseSeatMutation.isPending;

  const handleClick = async () => {
    if (reserveSeatMutation.isPending || releaseSeatMutation.isPending) return;

    try {
      if (isSelected) {
        await releaseSeatMutation.mutateAsync(seat.id);

        toggleSeat({
          ...seat,
          status: "available",
          lockedUntil: null,
        });

        return;
      }

      const response = await reserveSeatMutation.mutateAsync(seat.id);

      upsertSeat({
        ...seat,
        status: response.data.status,
        lockedUntil: response.data.lockedUntil,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={clsx(
        "h-9 w-9 rounded-md text-xs font-bold transition flex items-center justify-center border border-transparent relative z-10",
        {
          "bg-white text-black":
            seat.seatType === "standard" &&
            !isSelected &&
            seat.status !== "booked",
          "bg-yellow-400 text-black":
            seat.seatType === "vip" && !isSelected && seat.status !== "booked",
          "bg-pink-400 text-black":
            seat.seatType === "couple" &&
            !isSelected &&
            seat.status !== "booked",

          "bg-gray-400 text-white opacity-60 cursor-not-allowed":
            seat.status === "booked",

          "border-2 border-yellow-300 bg-yellow-200 text-black": isSelected,
        },
      )}
      style={{ boxShadow: isSelected ? "0 0 0 2px #facc15" : undefined }}
    >
      {seat.seatCode}
    </button>
  );
}
