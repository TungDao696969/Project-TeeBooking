import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { generateSeats } from "@/services/admin/seat.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  message: string;
}
export const useGenerateSeats = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: generateSeats,

    onSuccess: (data, variables) => {
      toast.success("Tạo ghế thành công");

      router.push(`/admin/room/${variables.roomId}/seats`);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message ?? "Tạo ghế thất bại");
    },
  });
};
