"use client";

import { Seat } from "@/types/admin/seat.type";

interface Props {
  seats: Seat[];
}

const SEAT_TYPE_STYLES: Record<string, { label: string; className: string }> = {
  STANDARD: {
    label: "Standard",
    className: "bg-blue-950/60 text-blue-400 border border-blue-900/60",
  },
  VIP: {
    label: "VIP",
    className: "bg-yellow-950/60 text-yellow-500 border border-yellow-900/60",
  },
  COUPLE: {
    label: "Couple",
    className: "bg-pink-950/60 text-pink-400 border border-pink-900/60",
  },
};

export default function SeatTable({ seats }: Props) {
  const getTypeStyle = (type: string) =>
    SEAT_TYPE_STYLES[type.toUpperCase()] ?? {
      label: type,
      className: "bg-zinc-800 text-zinc-400 border border-zinc-700",
    };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0d0d0f", fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-zinc-800/80">
        <div
          className="w-1.5 h-8 rounded-full flex-shrink-0"
          style={{ background: "#c9a84c" }}
        />
        <div>
          <h2
            className="text-xl tracking-widest m-0"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#c9a84c",
              lineHeight: 1.2,
            }}
          >
            Sơ đồ ghế ngồi
          </h2>
          <p className="text-xs text-zinc-600 tracking-widest uppercase mt-0.5">
            Cinestar Cinema
          </p>
        </div>
        <span
          className="ml-auto text-xs px-3 py-1 rounded-full border"
          style={{
            background: "#1a1710",
            borderColor: "#3a3020",
            color: "#c9a84c",
          }}
        >
          {seats.length} ghế
        </span>
      </div>

      {/* Table */}
      <table
        className="w-full border-collapse"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr style={{ background: "#13120e" }}>
            {["Mã ghế", "Hàng", "Số", "Loại ghế"].map((h, i) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase"
                style={{
                  color: "#6e6358",
                  width: i === 0 ? "22%" : i === 3 ? "40%" : "19%",
                  borderRadius:
                    i === 0
                      ? "8px 0 0 8px"
                      : i === 3
                        ? "0 8px 8px 0"
                        : undefined,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seats.map((seat) => {
            const typeStyle = getTypeStyle(seat.seatType);
            return (
              <tr
                key={seat.id}
                className="border-b transition-colors hover:bg-zinc-900/40"
                style={{ borderColor: "#1c1a15" }}
              >
                {/* Mã ghế */}
                <td className="px-4 py-3">
                  <span
                    className="tracking-widest text-base"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: "#e8e0d0",
                    }}
                  >
                    {seat.seatCode}
                  </span>
                </td>

                {/* Hàng */}
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md text-sm font-semibold border"
                    style={{
                      background: "#1a1710",
                      borderColor: "#2e2a1f",
                      color: "#c9a84c",
                    }}
                  >
                    {seat.seatRow}
                  </span>
                </td>

                {/* Số */}
                <td
                  className="px-4 py-3 text-sm font-medium"
                  style={{ color: "#b0a898" }}
                >
                  {seat.seatNumber}
                </td>

                {/* Loại ghế */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${typeStyle.className}`}
                  >
                    {typeStyle.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
