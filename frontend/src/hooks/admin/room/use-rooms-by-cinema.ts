"use client";

import { useQuery } from "@tanstack/react-query";

import { getRoomsByCinema } from "@/services/admin/room.service";

export const useRoomsByCinema = (
  cinemaId: string,
  page: number,
  limit = 10,
) => {
  return useQuery({
    queryKey: ["rooms", cinemaId, page, limit],

    queryFn: () => getRoomsByCinema(cinemaId, page, limit),

    enabled: !!cinemaId,

    placeholderData: (previousData) => previousData,
  });
};
