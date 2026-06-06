import { useQuery } from "@tanstack/react-query";

import { getTrashShowtimesService } from "@/services/admin/showtime.service";

export const useTrashShowtimes = () => {
  return useQuery({
    queryKey: ["trash-showtimes"],

    queryFn: getTrashShowtimesService,
  });
};
