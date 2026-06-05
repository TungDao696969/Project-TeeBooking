"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeatService } from "@/services/admin/seat.service";
import { UpdateSeatFormData } from "@/schemas/admin/seat.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useUpdateSeat = (seatId: string) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateSeatFormData) => updateSeatService(seatId, data),

    onSuccess: async () => {
      toast.success("Update seat successfully");

      await queryClient.invalidateQueries({
        queryKey: ["seat"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["seats"],
      });

      router.push("/admin/seat");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};
