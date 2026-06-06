import { useQuery } from "@tanstack/react-query";
import { getTrashSeatsService } from "@/services/admin/seat.service";

export const useTrashSeats = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["trash-seats", page, limit],

    queryFn: () => getTrashSeatsService(page, limit),
  });
};
