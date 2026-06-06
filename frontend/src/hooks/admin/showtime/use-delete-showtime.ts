import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteShowtimeApi } from "@/services/admin/showtime.service";
interface ErrorResponse {
  message: string;
}
export const useDeleteShowtime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShowtimeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["showtimes"] });
      queryClient.invalidateQueries({ queryKey: ["trash-showtimes"] });
      toast.success("Xóa suất chiếu thành công");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Xóa suất chiếu thất bại");
    },
  });
};
