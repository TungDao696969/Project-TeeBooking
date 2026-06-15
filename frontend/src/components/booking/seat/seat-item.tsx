"use client";

import clsx from "clsx";

import { Seat } from "@/types/seat.type";
import { useBookingStore } from "@/store/booking.store";
import { useReserveSeat } from "@/hooks/seat/use-reserve-seat";
import { useReleaseSeat } from "@/hooks/seat/use-release-seat";
import { toast } from "sonner";
interface Props {
  seat: Seat;
}

export default function SeatItem({ seat }: Props) {
  const { selectedSeats, tickets, toggleSeat, upsertSeat } = useBookingStore();
  const reserveSeatMutation = useReserveSeat();
  const releaseSeatMutation = useReleaseSeat();
  const isSelected = selectedSeats.some((s) => s.id === seat.id);

  const ticketQuantity = tickets.reduce(
    (sum, ticket) => sum + ticket.quantity,
    0,
  );

  const disabled =
    seat.status === "booked" ||
    seat.status === "locked" ||
    (seat.status === "reserved" && !isSelected) ||
    reserveSeatMutation.isPending ||
    releaseSeatMutation.isPending;

  const handleClick = async () => {
    if (reserveSeatMutation.isPending || releaseSeatMutation.isPending) return;

    if (ticketQuantity === 0) {
      toast.error("Vui lòng chọn vé trước");
      return;
    }

    if (!isSelected && selectedSeats.length >= ticketQuantity) {
      toast.error(`Bạn chỉ được chọn tối đa ${ticketQuantity} ghế`);

      return;
    }
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

  const formatSeatCode = (code: string) => {
    const match = code.match(/^([A-Za-z]+)(\d+)$/);
    if (match) {
      const row = match[1];
      const num = parseInt(match[2], 10);
      return `${row}${num.toString().padStart(2, "0")}`;
    }
    return code;
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={clsx(
        "h-8 w-14 rounded-md text-[11px] font-black tracking-wider transition flex items-center justify-center border relative z-10 select-none shadow-md",
        {
          // Standard Available
          "bg-white text-[#4c3cc5] border-transparent hover:bg-zinc-100 hover:scale-105":
            seat.seatType === "standard" &&
            seat.status === "available" &&
            !isSelected,

          // VIP Available
          "bg-[#ffd700] text-[#5c3c00] border-transparent hover:bg-[#ffea75] hover:scale-105":
            seat.seatType === "vip" &&
            seat.status === "available" &&
            !isSelected,

          // Couple Available
          "bg-[#ff69b4] text-[#4d002b] border-transparent hover:bg-[#ff94cb] hover:scale-105":
            seat.seatType === "couple" &&
            seat.status === "available" &&
            !isSelected,

          // Ghế đang được người khác giữ (Reserved)
          "bg-transparent border-2 border-[#10b981] text-[#10b981] cursor-not-allowed opacity-50":
            seat.status === "reserved" && !isSelected,

          // Đã đặt (Booked)
          "bg-[#2a2d3e] text-white/20 border border-white/5 cursor-not-allowed opacity-30":
            seat.status === "booked",

          // Ghế mình chọn (Selected)
          "bg-[#e2001a] text-white border-transparent shadow-[0_0_12px_rgba(226,0,26,0.5)] hover:scale-105": isSelected,
        },
      )}
    >
      {formatSeatCode(seat.seatCode)}
    </button>
  );
}
