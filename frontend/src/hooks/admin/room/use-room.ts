import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/services/admin/room.service";
import type { RoomListResponse } from "@/types/admin/room.type";

export const useRooms = (page: number = 1) => {
  return useQuery<RoomListResponse>({
    queryKey: ["rooms", page],
    queryFn: () => getRooms(page),
    placeholderData: (previousData) => previousData,
  });
};
