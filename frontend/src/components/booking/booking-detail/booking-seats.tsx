import { TicketType } from "@/types/booking.type";

type Props = {
  tickets: TicketType[];
};

export default function BookingSeats({ tickets }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E8B84B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
          <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
        </svg>
        Ghế đã đặt
        <span className="ml-auto font-semibold" style={{ color: "#E8B84B" }}>
          {tickets.length} ghế
        </span>
      </p>

      <div className="flex flex-wrap gap-2">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 border border-zinc-700 transition-colors hover:border-yellow-600"
            style={{ background: "#1E1E24" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8B84B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
            </svg>
            {t.showtimeSeat.seat.seatCode}
          </div>
        ))}
      </div>
    </div>
  );
}
