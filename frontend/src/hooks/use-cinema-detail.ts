"use client";

import { useQuery } from "@tanstack/react-query";

import { getCinemaDetail } from "@/services/cinema.api";

export const useCinemaDetail = (slug: string) => {
  return useQuery({
    queryKey: ["cinema-detail", slug],
    queryFn: () => getCinemaDetail(slug),
    enabled: !!slug,
  });
};
