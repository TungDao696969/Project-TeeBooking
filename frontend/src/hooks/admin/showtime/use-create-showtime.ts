import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { createShowtime } from "@/services/admin/showtime.service";
export const useCreateShowtime = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createShowtime,

    onSuccess: () => {
      toast.success("Tạo suất chiếu thành công");

      router.push("/admin/showtime");
    },

    onError: () => {
      toast.error("Tạo suất chiếu không thành công");
    },
  });
};
