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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
  );
}
