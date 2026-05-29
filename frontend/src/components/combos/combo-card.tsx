"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";

import QuantityButton from "./quantity-button";

import { FoodCombo } from "@/types/combo.type";

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
    <Card className="overflow-hidden border-none bg-zinc-900 text-white">
      <div className="relative h-52 w-full">
        <Image
          src={combo.imageUrl || "/images/food.jpg"}
          alt={combo.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <h3 className="text-lg font-bold">{combo.name}</h3>

        <p className="line-clamp-2 text-sm text-zinc-400">
          {combo.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-yellow-400">
            {combo.price.toLocaleString("vi-VN")}đ
          </span>

          <QuantityButton
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    </Card>
  );
}
