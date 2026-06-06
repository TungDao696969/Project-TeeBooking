import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteUserService } from "@/services/admin/user.service";
import { AxiosError } from "axios";
interface ErrorResponse {
  message: string;
}
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserService,

    onSuccess: (data) => {
      toast.success(data?.message || "User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });
};
