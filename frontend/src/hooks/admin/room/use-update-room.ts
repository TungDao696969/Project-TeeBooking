"use client";

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { updateRoom } from "@/services/admin/room.service";
import { UpdateCinemaRoomPayload } from "@/types/admin/room.type";

interface ErrorResponse {
  message: string;
}

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCinemaRoomPayload;
    }) => updateRoom(id, payload),

    onSuccess: async (_, variables) => {
      toast.success("Cập nhật phòng chiếu thành công");

      await queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["room", variables.id],
      });

      router.push("/admin/room");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Cập nhật phòng chiếu thất bại",
      );
    },
  });
};
