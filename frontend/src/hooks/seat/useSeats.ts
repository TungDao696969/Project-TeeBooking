"use client";

import { useQuery } from "@tanstack/react-query";
import { getSeatsByShowtime } from "@/services/seat.api";

export const useSeats = (showtimeId: string) => {
  return useQuery({
    queryKey: ["showtime-seats", showtimeId],
    queryFn: () => getSeatsByShowtime(showtimeId),
    enabled: !!showtimeId,
  });
};
