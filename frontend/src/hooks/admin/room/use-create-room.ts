"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { createRoom } from "@/services/admin/room.service";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

interface ErrorResponse {
  message: string;
}

export const useCreateRoom = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,

    onSuccess: async () => {
      toast.success("Tạo phòng chiếu thành công");

      await queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      router.push("/admin/room");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Tạo phòng chiếu thất bại");
    },
  });
};
