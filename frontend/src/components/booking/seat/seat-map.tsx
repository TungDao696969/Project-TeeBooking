"use client";

import SeatItem from "./seat-item";
import { SeatRow } from "@/types/seat.type";

interface Props {
  seatRows: SeatRow[];
}

const getGridColumn = (seatCode: string) => {
  const row = seatCode.charAt(0).toUpperCase();
  const num = parseInt(seatCode.substring(1), 10);
  if (isNaN(num)) return 1;

  if (row === "A" || row === "B" || row === "C") {
    return num + 2;
  }
  if (row === "D" || row === "E" || row === "F") {
    return num;
  }
  if (row === "G") {
    return num;
  }
  if (row === "H") {
    if (num <= 3) return num;
    return num + 4; // Gap of 4 columns (4, 5, 6, 7 are empty)
  }
  return num;
};

export default function SeatMap({ seatRows }: Props) {
  // Find the max column index among all seats in all rows to determine grid columns dynamically
  const maxCol = Math.max(
    ...seatRows.flatMap((row) =>
      row.seats.map((seat) => getGridColumn(seat.seatCode))
    ),
    10 // fallback minimum of 10
  );

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-b from-[#0f0e26] to-[#17123a] p-4 md:p-10 rounded-3xl shadow-2xl border border-white/5 mx-auto lg:w-fit lg:min-w-[800px]">
      {/* Screen / Màn hình */}
      <div className="w-full max-w-2xl mx-auto mb-14 flex flex-col items-center relative select-none">
        <div className="w-full h-8 relative overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110%] h-[200px] border-t-4 border-white/70 rounded-[50%] shadow-[0_-8px_20px_rgba(255,255,255,0.15)]" />
        </div>
        <div className="text-white/80 text-sm font-bold tracking-[0.3em] uppercase mt-2">Màn hình</div>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col gap-4 w-full select-none overflow-x-auto lg:overflow-x-hidden pb-4 max-w-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {seatRows.map((row) => (
          <div key={row.row} className="flex items-center gap-2 md:gap-6 w-max mx-auto px-4">
            {/* Row Label */}
            <div className="w-6 md:w-8 font-black text-white/50 text-sm md:text-base text-center uppercase sticky left-0 bg-[#0f0e26] z-10 py-1">
              {row.row}
            </div>

            {/* Seats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${maxCol}, minmax(0, 1fr))`,
                gap: "8px",
              }}
              className="md:gap-[10px]"
            >
              {row.seats.map((seat) => {
                const colStart = getGridColumn(seat.seatCode);
                return (
                  <div
                    key={seat.id}
                    style={{ gridColumnStart: colStart }}
                    className="flex justify-center"
                  >
                    <SeatItem seat={seat} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
