import { useQuery } from "@tanstack/react-query";
import { getCinemas } from "@/services/admin/cinema.service";

export const useCinemas = (page: number) => {
  return useQuery({
    queryKey: ["cinemas", page],

    queryFn: () => getCinemas(page),
  });
};
