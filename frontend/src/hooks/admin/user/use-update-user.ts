import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserService } from "@/services/admin/user.service";
import { UpdateUserInput } from "@/types/admin/user.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      updateUserService(id, data),

    onSuccess: (_, variables) => {
      toast.success("User updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });

      router.push("/admin/user");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};
