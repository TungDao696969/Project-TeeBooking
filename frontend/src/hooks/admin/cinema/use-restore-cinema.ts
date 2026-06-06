"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { restoreCinema } from "@/services/admin/cinema.service";

export const useRestoreCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreCinema,

    onSuccess: () => {
      toast.success("Khôi phục rạp thành công");

      queryClient.invalidateQueries({
        queryKey: ["admin-trash-cinemas"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-cinemas"],
      });
    },

    onError: () => {
      toast.error("Khôi phục thất bại");
    },
  });
};
