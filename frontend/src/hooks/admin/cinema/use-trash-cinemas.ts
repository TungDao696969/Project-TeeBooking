"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrashCinemas } from "@/services/admin/cinema.service";

export const useTrashCinemas = () => {
  return useQuery({
    queryKey: ["admin-trash-cinemas"],

    queryFn: getTrashCinemas,
  });
};
