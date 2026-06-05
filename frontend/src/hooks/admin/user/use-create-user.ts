import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUserService } from "@/services/admin/user.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createUserService,

    onSuccess: () => {
      toast.success("User created successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      router.push("/admin/user");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Tạo phòng chiếu thất bại");
    },
  });
};
