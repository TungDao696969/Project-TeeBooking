"use client";

import Image from "next/image";
import { FoodCombo } from "@/types/combo.type";
import QuantityButton from "./quantity-button";

interface Props {
  combo: FoodCombo;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ComboCard({
  combo,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-md bg-white">
        <Image
          src={combo.imageUrl || "/images/food.jpg"}
          alt={combo.name}
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="flex min-w-0 flex-col">
        <h3 className="text-xl font-bold uppercase text-white">{combo.name}</h3>

        {combo.description && (
          <p className="mt-1 text-sm text-white/80">{combo.description}</p>
        )}

        <p className="mt-2 text-2xl font-bold text-white">
          {combo.price.toLocaleString("vi-VN")} VNĐ
        </p>

        <div className="mt-6">
          <QuantityButton
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    </div>
  );
}
