"use client";

import { useQuery } from "@tanstack/react-query";

import { getTicketTypes } from "@/services/booking.api";

export const useTicketTypes = (showtimeId: string) => {
  return useQuery({
    queryKey: ["ticket-types", showtimeId],

    queryFn: () => getTicketTypes(showtimeId),

    enabled: !!showtimeId,
  });
};
