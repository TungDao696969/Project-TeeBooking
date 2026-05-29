"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityButton({
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="flex items-center overflow-hidden rounded-lg border border-white/15 bg-white/[0.06]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        aria-label="Giảm số lượng"
        className="flex h-10 w-10 items-center justify-center text-white/60 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="font-bebas flex h-10 w-12 items-center justify-center text-2xl tracking-widest text-white">
        {quantity}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Tăng số lượng"
        className="flex h-10 w-10 items-center justify-center text-white/60 transition hover:bg-white/10 hover:text-yellow-400"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
