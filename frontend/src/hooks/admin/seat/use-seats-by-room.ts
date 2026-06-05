import { useQuery } from "@tanstack/react-query";

import { getSeatsByRoomService } from "@/services/admin/seat.service";

export const useSeatsByRoom = (roomId: string) => {
  return useQuery({
    queryKey: ["seats", roomId],

    queryFn: () => getSeatsByRoomService(roomId),

    enabled: !!roomId,
  });
};
