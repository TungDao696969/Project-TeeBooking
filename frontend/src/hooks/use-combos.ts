"use client";

import { useQuery } from "@tanstack/react-query";
import { getFoodCombos } from "@/services/combo.api";

export const useCombos = () => {
  return useQuery({
    queryKey: ["food-combos"],
    queryFn: getFoodCombos,
  });
};
