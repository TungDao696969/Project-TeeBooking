import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateSeatTypeService } from "@/services/admin/seat.service";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export const useUpdateSeatType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSeatTypeService,

    onSuccess: (data, variables) => {
      toast.success("Cấu hình loại ghế thành công");

      // Invalidate seat queries for this room
      queryClient.invalidateQueries({
        queryKey: ["seats", variables.roomId],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error?.response?.data?.message ?? "Cấu hình loại ghế thất bại",
      );
    },
  });
};
