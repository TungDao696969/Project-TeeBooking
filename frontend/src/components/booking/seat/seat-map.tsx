"use client";

import SeatItem from "./seat-item";

import { SeatRow } from "@/types/seat.type";

interface Props {
  seatRows: SeatRow[];
}

export default function SeatMap({ seatRows }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#23273a] p-8 rounded-2xl shadow-lg mx-auto max-w-fit">
        {seatRows.map((row) => (
          <div key={row.row} className="flex items-center gap-3 mb-2">
            <div className="w-6 font-bold text-white/60 text-center">
              {row.row}
            </div>
            <div className="flex gap-2 relative">
              {row.seats.map((seat) => (
                <SeatItem key={seat.id} seat={seat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
