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

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={clsx(
        "h-9 w-9 rounded-md text-xs font-bold transition flex items-center justify-center border relative z-10",
        {
          // Standard
          "bg-white text-black border-transparent":
            seat.seatType === "standard" &&
            seat.status === "available" &&
            !isSelected,

          // VIP
          "bg-yellow-400 text-black border-transparent":
            seat.seatType === "vip" &&
            seat.status === "available" &&
            !isSelected,

          // Couple
          "bg-pink-400 text-black border-transparent":
            seat.seatType === "couple" &&
            seat.status === "available" &&
            !isSelected,

          // Ghế đang được người khác giữ
          "bg-transparent border-2 border-green-400 cursor-not-allowed":
            seat.status === "reserved" && !isSelected,

          // Đã đặt
          "bg-gray-400 text-white opacity-60 cursor-not-allowed":
            seat.status === "booked",

          // Ghế mình chọn
          "border-2 border-yellow-300 bg-yellow-200 text-black": isSelected,
        },
      )}
      style={{ boxShadow: isSelected ? "0 0 0 2px #facc15" : undefined }}
    >
      {seat.seatCode}
    </button>
  );
}
