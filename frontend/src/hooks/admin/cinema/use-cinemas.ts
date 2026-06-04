import { useQuery } from "@tanstack/react-query";
import { getCinemas } from "@/services/admin/cinema.service";
import type { CinemasResponse } from "@/types/admin/cinema.type";

export const useCinemas = (page: number = 1) => {
  return useQuery<CinemasResponse>({
    queryKey: ["cinemas", page],

    queryFn: () => getCinemas(page),
  });
};
