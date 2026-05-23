"use client";

import { useQuery } from "@tanstack/react-query";
import { getCinemas } from "@/services/cinema.api";

export const useCinemas = () => {
  return useQuery({
    queryKey: ["cinemas"],
    queryFn: getCinemas,
  });
};
