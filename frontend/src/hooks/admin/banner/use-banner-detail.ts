"use client";

import { useQuery } from "@tanstack/react-query";
import { getBannerById } from "@/services/admin/banner.service";

export const useBannerDetail = (id: string) => {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () => getBannerById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
};
