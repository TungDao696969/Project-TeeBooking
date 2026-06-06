"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { restoreShowtimeService } from "@/services/admin/showtime.service";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useRestoreShowtime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreShowtimeService,

    onSuccess: () => {
      toast.success("Khôi phục suất chiếu thành công");

      queryClient.invalidateQueries({
        queryKey: ["trash-showtimes"],
      });

      queryClient.invalidateQueries({
        queryKey: ["showtimes"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Khôi phục thất bại");
    },
  });
};
