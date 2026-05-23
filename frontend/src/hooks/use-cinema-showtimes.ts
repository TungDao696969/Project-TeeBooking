"use client";

import { useQuery } from "@tanstack/react-query";
import { getCinemaShowtimes } from "@/services/cinema.api";

export const useCinemaShowtimes = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ["cinema-showtimes", slug],
    queryFn: () => getCinemaShowtimes(slug),
    enabled: !!slug && enabled,
  });
};
