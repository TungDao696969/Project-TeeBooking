"use client";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";

import { SeatRow } from "@/types/admin/showtime.type";

interface Props {
  rows: SeatRow[];
}

const seatStyles: Record<string, string> = {
  available: "bg-[#1a9e5c] hover:bg-[#158a4f] text-white",

  booked: "bg-[#e8192c] text-white cursor-not-allowed opacity-80",

  locked: "bg-amber-400 hover:bg-amber-500 text-white",

  vip: "bg-violet-600 hover:bg-violet-700 text-white",
};

export default function SeatLayout({ rows }: Props) {

  return (
    <div className="space-y-4">
      {/* SEAT LAYOUT */}
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.row} className="flex items-center gap-1.5">
            <div className="w-6 flex-shrink-0 text-center text-xs font-semibold text-white/40">
              {row.row}
            </div>

            {row.seats.map((seat) => (
              <button
                key={seat.id}
                disabled={seat.status === "booked"}
                title={`${seat.seatCode} – ${seat.status}`}
                className={`
                  h-7 w-8 rounded-md
                  text-[10px] font-medium
                  transition-transform
                  hover:scale-110
                  active:scale-95
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#e8192c]
                  focus:ring-offset-1
                  focus:ring-offset-[#0b1633]
                  ${seatStyles[seat.status] ?? seatStyles.available}
                `}
              >
                {seat.seatCode}
              </button>
            ))}
          </div>
        ))}

        {/* LEGEND */}
        <div className="mt-2 flex flex-wrap justify-center gap-4 border-t border-white/10 pt-4 text-xs text-white/40">
          {[
            {
              color: "bg-[#1a9e5c]",
              label: "Còn trống",
            },
            {
              color: "bg-[#e8192c]",
              label: "Đã đặt",
            },
            {
              color: "bg-amber-400",
              label: "Đang giữ",
            },
            {
              color: "bg-violet-600",
              label: "VIP",
            },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={`h-3.5 w-4 rounded-sm ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
