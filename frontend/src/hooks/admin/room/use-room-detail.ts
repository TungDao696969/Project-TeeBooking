import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "@/services/admin/room.service";

export const useRoomDetail = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoomDetail(id),
    enabled: !!id,
  });
};
