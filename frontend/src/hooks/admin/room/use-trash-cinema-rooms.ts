import { useQuery } from "@tanstack/react-query";

import { getTrashCinemaRoomsService } from "@/services/admin/room.service";

export const useTrashCinemaRooms = () => {
  return useQuery({
    queryKey: ["trash-cinema-rooms"],

    queryFn: getTrashCinemaRoomsService,
  });
};
