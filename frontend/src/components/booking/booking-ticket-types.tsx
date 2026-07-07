"use client";

import { useMemo, useEffect, useState } from "react";
import { useTicketTypes } from "@/hooks/booking/use-ticket-types";
import { useBookingStore } from "@/store/booking.store";
import { useReleaseSeat } from "@/hooks/seat/use-release-seat";
import BookingHeader from "./booking-header";

// ─── TicketTypeCard ───────────────────────────────────────────────────────────

interface TicketType {
  id: string;
  name: string;
  type?: string; // "ĐƠN" | "ĐÔI"
  price: number | string;
}

interface CardProps {
  ticket: TicketType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function TicketTypeCard({
  ticket,
  quantity,
  onIncrease,
  onDecrease,
}: CardProps) {
  const formattedPrice = Number(ticket.price).toLocaleString("vi-VN") + " VNĐ";

  return (
    <div className="rounded-lg border border-white/20 bg-[#1e1e4a] p-5">
      <p className="mb-1 font-bold text-sm tracking-widest text-white uppercase">
        {ticket.name}
      </p>

      {ticket.type && (
        <p className="mb-2 font-bold text-sm tracking-widest text-yellow-400 uppercase">
          {ticket.type}
        </p>
      )}

      <p className="mb-5 font-semibold text-base text-white">
        {formattedPrice}
      </p>

      <div className="flex items-center">
        <button
          onClick={onDecrease}
          disabled={quantity === 0}
          className="flex h-10 w-10 items-center justify-center rounded-l-md bg-white/10 text-white text-xl font-light transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <div className="flex h-10 w-12 items-center justify-center bg-white/10 text-white font-semibold text-base">
          {quantity}
        </div>
        <button
          onClick={onIncrease}
          className="flex h-10 w-10 items-center justify-center rounded-r-md bg-white/10 text-white text-xl font-light transition hover:bg-white/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── BookingTicketTypes ───────────────────────────────────────────────────────

interface Props {
  showtimeId: string;
}

export default function BookingTicketTypes({ showtimeId }: Props) {
  const { data, isLoading } = useTicketTypes(showtimeId);
  const { tickets, increaseTicket, decreaseTicket, selectedSeats } =
    useBookingStore();
  const releaseSeatMutation = useReleaseSeat();
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const totalTicketPrice = useMemo(() => {
    if (!data) return 0;
    return tickets.reduce((total, item) => {
      const tt = data.ticketTypes.find((t) => t.id === item.ticketTypeId);
      return tt ? total + Number(tt.price) * item.quantity : total;
    }, 0);
  }, [tickets, data]);

  const totalSeatExtra = selectedSeats.reduce(
    (sum, s) => sum + (s.extraPrice || 0),
    0,
  );
  const totalPrice = totalTicketPrice + totalSeatExtra;
  const totalTickets = tickets.reduce((t, i) => t + i.quantity, 0);
  const timerDisplay = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0e1a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />
          <p className="font-barlow text-sm tracking-widest text-white/40 uppercase">
            Đang tải...
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const handleDecrease = (ticketId: string) => {
    const ticket = tickets.find((t) => t.ticketTypeId === ticketId);
    if (!ticket || ticket.quantity <= 0) return;

    const currentTotal = tickets.reduce((t, i) => t + i.quantity, 0);
    const newTotal = currentTotal - 1;

    if (selectedSeats.length > newTotal) {
      const droppedSeats = selectedSeats.slice(newTotal);
      droppedSeats.forEach((seat) => {
        releaseSeatMutation.mutate(seat.id);
      });
    }

    decreaseTicket(ticketId);
  };

  return (
    <section className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <BookingHeader showtime={data.showtime} />

        <h2 className="mb-10 mt-8 text-center font-black text-2xl tracking-widest text-white uppercase md:text-4xl">
          CHỌN LOẠI VÉ
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.ticketTypes.map((ticket) => {
            const quantity =
              tickets.find((t) => t.ticketTypeId === ticket.id)?.quantity ?? 0;
            return (
              <TicketTypeCard
                key={ticket.id}
                ticket={ticket}
                quantity={quantity}
                onIncrease={() =>
                  increaseTicket(ticket.id, Number(ticket.price))
                }
                onDecrease={() => handleDecrease(ticket.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
