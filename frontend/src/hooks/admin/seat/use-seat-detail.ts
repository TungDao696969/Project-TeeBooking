import { useQuery } from "@tanstack/react-query";

import { getSeatDetailService } from "@/services/admin/seat.service";

export const useSeatById = (id: string) => {
  return useQuery({
    queryKey: ["seat", id],
    queryFn: () => getSeatDetailService(id),

    enabled: !!id,
  });
};
