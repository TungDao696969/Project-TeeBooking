import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FoodCombo, SelectedCombo } from "@/types/combo.type";

interface ComboStore {
  selectedCombos: SelectedCombo[];

  addCombo: (combo: FoodCombo) => void;

  removeCombo: (comboId: string) => void;

  increaseQuantity: (comboId: string) => void;

  decreaseQuantity: (comboId: string) => void;

  clearCombos: () => void;

  getTotalPrice: () => number;
}

export const useComboStore = create<ComboStore>()(
  persist(
    (set, get) => ({
      selectedCombos: [],

      addCombo: (combo) => {
        const existing = get().selectedCombos.find(
          (item) => item.combo.id === combo.id,
        );

        if (existing) {
          set({
            selectedCombos: get().selectedCombos.map((item) =>
              item.combo.id === combo.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          });
        } else {
          set({
            selectedCombos: [
              ...get().selectedCombos,
              {
                combo,
                quantity: 1,
              },
            ],
          });
        }
      },

      removeCombo: (comboId) => {
        set({
          selectedCombos: get().selectedCombos.filter(
            (item) => item.combo.id !== comboId,
          ),
        });
      },

      increaseQuantity: (comboId) => {
        set({
          selectedCombos: get().selectedCombos.map((item) =>
            item.combo.id === comboId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        });
      },

      decreaseQuantity: (comboId) => {
        set({
          selectedCombos: get()
            .selectedCombos.map((item) =>
              item.combo.id === comboId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        });
      },

      getTotalPrice: () => {
        return get().selectedCombos.reduce(
          (total, item) => total + Number(item.combo.price) * item.quantity,
          0,
        );
      },

      clearCombos: () => {
        set({
          selectedCombos: [],
        });
      },
    }),
    {
      name: "combo-storage",
    },
  ),
);
