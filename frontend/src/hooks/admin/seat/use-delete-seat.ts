import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSeatService } from "@/services/admin/seat.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
interface ErrorResponse {
  message: string;
}
export const useDeleteSeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSeatService(id),

    onSuccess: () => {
      toast.success("Delete seat successfully");

      queryClient.invalidateQueries({
        queryKey: ["seats"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};
