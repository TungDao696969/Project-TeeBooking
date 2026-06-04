import { useQuery } from "@tanstack/react-query";
import { getSeats } from "@/services/admin/seat.service";
export const useSeats = (page: number) => {
  return useQuery({
    queryKey: ["seats", page],
    queryFn: () => getSeats(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};


