import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { restoreUserService } from "@/services/admin/user.service";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useRestoreUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreUserService,

    onSuccess: (data) => {
      toast.success(data.message || "User restored successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-users"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to restore user");
    },
  });
};
