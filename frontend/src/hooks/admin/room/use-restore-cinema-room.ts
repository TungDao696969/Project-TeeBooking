import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { restoreCinemaRoomService } from "@/services/admin/room.service";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useRestoreCinemaRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreCinemaRoomService,

    onSuccess: (data) => {
      toast.success(data.message || "Khôi phục phòng chiếu thành công");

      queryClient.invalidateQueries({
        queryKey: ["trash-cinema-rooms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cinema-rooms"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Khôi phục thất bại");
    },
  });
};
