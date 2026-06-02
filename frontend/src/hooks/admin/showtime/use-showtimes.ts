import { useQuery } from "@tanstack/react-query";
import { showtimeService } from "@/services/admin/showtime.service";

export const useShowtimes = (page: number) => {
  return useQuery({
    queryKey: ["showtimes", page],
    queryFn: () => showtimeService.getAll(page),
  });
};
