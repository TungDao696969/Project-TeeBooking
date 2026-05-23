"use client";

import { DateGroup } from "@/types/cinema.type";
import { useBookingStore } from "@/store/booking.store";

interface Props {
  date: DateGroup;
}

export default function ShowtimeGroup({ date }: Props) {
  const { setSelectedShowtime } = useBookingStore();

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-yellow-400">
        {date.date}
      </h3>

      <div className="space-y-4">
        {date.formats.map((format) => (
          <div key={format.type}>
            <div className="mb-3 text-sm font-medium text-white">
              {format.type}
            </div>

            <div className="flex flex-wrap gap-3">
              {format.showtimes.map((showtime) => (
                <button
                  key={showtime.id}
                  onClick={() => setSelectedShowtime(showtime.id)}
                  className="rounded-xl border border-white/10 bg-[#13203A] px-5 py-3 text-white transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  {showtime.time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
