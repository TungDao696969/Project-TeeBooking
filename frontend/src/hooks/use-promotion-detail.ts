"use client";

import { useQuery } from "@tanstack/react-query";

import { getPromotionDetail } from "@/services/promotion.api";

export const usePromotionDetail = (id: string) => {
  return useQuery({
    queryKey: ["promotion-detail", id],

    queryFn: () => getPromotionDetail(id),

    enabled: !!id,
  });
};
