import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { updateShowtimeApi } from "@/services/admin/showtime.service";

export const useUpdateShowtime = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateShowtimeApi,

    onSuccess: () => {
      toast.success("Cập nhật suất chiếu thành công");

      router.push("/admin/showtime");
    },

    onError: () => {
      toast.error("Cập nhật suất chiếu thất bại");
    },
  });
};
