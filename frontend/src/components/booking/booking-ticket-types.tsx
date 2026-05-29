"use client";

import { useMemo, useEffect, useState } from "react";
import { useTicketTypes } from "@/hooks/booking/use-ticket-types";
import { useBookingStore } from "@/store/booking.store";
import BookingHeader from "./booking-header";
import TicketTypeCard from "./ticket-type-card";

interface Props {
  showtimeId: string;
}

export default function BookingTicketTypes({ showtimeId }: Props) {
  const { data, isLoading } = useTicketTypes(showtimeId);
  const { tickets, increaseTicket, decreaseTicket, selectedSeats } =
    useBookingStore();
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // Tổng tiền = tổng tiền vé + tổng tiền ghế chọn (nếu có extra)
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0d1520] text-white">
      <div className="container mx-auto px-6 py-10">
        <BookingHeader showtime={data.showtime} />

        {/* Section heading */}
        <div className="mb-3 mt-6">
          <h2 className="font-bebas mt-1 text-xl tracking-widest text-white md:text-5xl">
            Chọn <span className="text-yellow-400">Loại Vé</span>
          </h2>
        </div>

        {/* Gold divider */}
        <div className="mb-10 h-px bg-gradient-to-r from-yellow-400/40 via-yellow-400/10 to-transparent" />

        {/* Cards grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                onDecrease={() => decreaseTicket(ticket.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
