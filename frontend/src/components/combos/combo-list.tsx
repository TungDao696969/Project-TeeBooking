"use client";

import ComboCard from "./combo-card";

import { useCombos } from "@/hooks/use-combos";

import { useComboStore } from "@/store/combo.store";

import { FoodCombo } from "@/types/combo.type";

export default function ComboList() {
  const { data, isLoading } = useCombos();

  const { selectedCombos, increaseQuantity, decreaseQuantity, addCombo } =
    useComboStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 h-px from-yellow-400/40 via-yellow-400/10 to-transparent" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data?.map((combo: FoodCombo) => {
            const selected = selectedCombos.find(
              (item) => item.combo.id === combo.id,
            );

            const quantity = selected?.quantity || 0;

            return (
              <ComboCard
                key={combo.id}
                combo={combo}
                quantity={quantity}
                onIncrease={() => {
                  if (selected) {
                    increaseQuantity(combo.id);
                  } else {
                    addCombo(combo);
                  }
                }}
                onDecrease={() => decreaseQuantity(combo.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
