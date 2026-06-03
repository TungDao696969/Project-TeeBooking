import { useQuery } from "@tanstack/react-query";
import { getAllShowtime } from "@/services/admin/showtime.service";
export const useShowtimes = (page: number) => {
  return useQuery({
    queryKey: ["showtimes", page],
    queryFn: () => getAllShowtime(page),
  });
};
