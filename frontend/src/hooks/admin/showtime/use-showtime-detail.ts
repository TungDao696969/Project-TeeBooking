import { useQuery } from "@tanstack/react-query";

import { getShowtimeByIdApi } from "@/services/admin/showtime.service";

export const useShowtimeByID = (id: string) => {
  return useQuery({
    queryKey: ["showtime", id],

    queryFn: () => getShowtimeByIdApi(id),

    enabled: !!id,
  });
};
