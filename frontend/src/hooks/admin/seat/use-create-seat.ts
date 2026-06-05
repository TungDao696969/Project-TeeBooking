import { useMutation } from "@tanstack/react-query";
import { createSeatService } from "@/services/admin/seat.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCreateSeat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSeatService,

    onSuccess: async () => {
      toast.success("Create seat successfully");

      await queryClient.invalidateQueries({
        queryKey: ["seats"],
      });

      router.push("/admin/seat");
    },

    onError: (error: unknown) => {
      console.error("Create seat error:", error);
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const message =
        err.response?.data?.message || err.message || "Create seat failed";
      toast.error(message);
    },
  });
};
