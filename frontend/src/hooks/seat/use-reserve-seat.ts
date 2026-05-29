import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reserveSeat } from "@/services/showtime-seat.api";

import { useSeatStore } from "@/store/seat.store";

export const useReserveSeat = () => {
  const addSeat = useSeatStore((state) => state.addSeat);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reserveSeat,

    onSuccess: (response) => {
      addSeat(response.data);
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

      toast.error(axiosError.response?.data?.message || "Giữ ghế thất bại");
    },
  });
};
