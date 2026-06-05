import { useQuery } from "@tanstack/react-query";
import { getShowtimeSeats } from "@/services/admin/showtime.service";

export const useShowtimeSeats = (showtimeId: string) => {
  return useQuery({
    queryKey: ["showtime-seats", showtimeId],
    queryFn: () => getShowtimeSeats(showtimeId),
    enabled: !!showtimeId,
  });
};
