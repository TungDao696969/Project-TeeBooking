"use client";

import { useQuery } from "@tanstack/react-query";

import { getPromotions } from "@/services/promotion.api";

export const usePromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
  });
};
