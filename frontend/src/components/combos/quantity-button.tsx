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
    <div className="inline-flex w-fit h-12 overflow-hidden rounded-md bg-slate-400 shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        aria-label="Giảm số lượng"
        className="flex w-12 items-center justify-center text-slate-900 transition hover:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>

      <div className="flex min-w-[52px] items-center justify-center border-x border-slate-400 px-3 text-lg font-semibold text-slate-900">
        {quantity}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Tăng số lượng"
        className="flex w-12 items-center justify-center text-slate-900 transition hover:bg-slate-400"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
