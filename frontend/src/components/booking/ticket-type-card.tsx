"use client";

import { Minus, Plus } from "lucide-react";
import { TicketType } from "@/types/booking.type";

const TYPE_STYLES: Record<string, string> = {
  single: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  couple: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

function formatPrice(price: number | string) {
  return Number(price).toLocaleString("vi-VN");
}

interface Props {
  ticket: TicketType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function TicketTypeCard({
  ticket,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  const isActive = quantity > 0;
  const typeStyle =
    TYPE_STYLES[ticket.type.toLowerCase()] ??
    "bg-white/10 text-white/60 border-white/10";
  const typeLabel = ticket.type.toUpperCase();

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 ${
        isActive
          ? "border-yellow-400/60 bg-yellow-400/[0.07]"
          : "border-white/10 bg-white/[0.03] hover:border-yellow-400/30 hover:bg-yellow-400/[0.04]"
      }`}
    >
      {/* Corner accent */}
      <div
        className={`absolute right-0 top-0 h-0 w-0 border-r-[28px] border-t-[28px] border-r-transparent border-t-transparent transition-all ${
          isActive
            ? "border-r-yellow-400/50"
            : "border-r-white/[0.06] group-hover:border-r-yellow-400/20"
        }`}
        style={{
          borderRightColor: "transparent",
          borderTopColor: isActive
            ? "rgba(250,200,50,0.45)"
            : "rgba(255,255,255,0.06)",
        }}
      />

      {/* Type badge */}
      <span
        className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold tracking-[2px] uppercase ${typeStyle}`}
      >
        {typeLabel}
      </span>

      {/* Name */}
      <h3 className="font-bebas mt-3 text-2xl tracking-[2px] text-white">
        {ticket.name}
      </h3>
      {ticket.description ? (
        <p className="mt-0.5 text-xs tracking-wide text-white/35">
          {ticket.description}
        </p>
      ) : null}

      {/* Price */}
      <div className="font-bebas mt-4 text-3xl tracking-wide text-yellow-400">
        {formatPrice(ticket.price)}
        <span className="ml-1 font-barlow text-sm font-semibold text-yellow-400/50">
          VNĐ
        </span>
      </div>

      {/* Quantity control */}
      <div className="mt-5 flex items-center gap-0 w-fit overflow-hidden rounded-lg border border-white/15 bg-white/[0.06]">
        <button
          type="button"
          onClick={onDecrease}
          className="flex h-10 w-10 items-center justify-center text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
          disabled={quantity === 0}
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="font-bebas flex h-10 w-12 items-center justify-center text-2xl tracking-widest text-white">
          {quantity}
        </div>
        <button
          type="button"
          onClick={onIncrease}
          className="flex h-10 w-10 items-center justify-center text-white/60 transition hover:bg-white/10 hover:text-yellow-400"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
