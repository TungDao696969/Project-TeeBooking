"use client";

import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { releaseSeat } from "@/services/showtime-seat.api";

import { useSeatStore } from "@/store/seat.store";

export const useReleaseSeat = () => {
  const removeSeat = useSeatStore((state) => state.removeSeat);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: releaseSeat,

    onSuccess: (_, showtimeSeatId) => {
      removeSeat(showtimeSeatId);
      queryClient.invalidateQueries({ queryKey: ["showtime-seats"] });
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      toast.error(axiosError.response?.data?.message || "Release ghế thất bại");
    },
  });
};
