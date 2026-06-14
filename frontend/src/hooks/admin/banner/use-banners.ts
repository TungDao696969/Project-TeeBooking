"use client";

import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/services/admin/banner.service";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 1000 * 60 * 5,
  });
};
