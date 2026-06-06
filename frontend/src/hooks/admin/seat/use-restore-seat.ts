"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restoreSeatService } from "@/services/admin/seat.service";
import { AxiosError } from "axios";
interface ErrorResponse {
  message: string;
}
export const useRestoreSeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreSeatService,

    onSuccess: (data) => {
      toast.success(data.message || "Khôi phục ghế thành công");

      queryClient.invalidateQueries({
        queryKey: ["seats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-seats"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Khôi phục thất bại");
    },
  });
};
