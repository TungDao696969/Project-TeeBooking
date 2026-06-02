// features/cinemas/hooks/use-cinema.ts

import { useQuery } from "@tanstack/react-query";

import { getCinema } from "@/services/admin/cinema.service";

export const useCinemaById = (id: string) => {
  return useQuery({
    queryKey: ["cinema", id],
    queryFn: () => getCinema(id),

    enabled: !!id,
  });
};
