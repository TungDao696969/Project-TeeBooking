import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";

import { createShowtime } from "@/services/admin/showtime.service";

interface ErrorResponse {
  message?: string;

  errors?: {
    message: string;
  }[];
}

export const useCreateShowtime = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createShowtime,

    onSuccess: () => {
      toast.success("Tạo suất chiếu thành công");

      router.push("/admin/showtime");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const serverMessage =
        error.response?.data?.message ||
        error.message ||
        "Tạo suất chiếu không thành công";

      const validationErrors = error.response?.data?.errors;

      const detailMessage = Array.isArray(validationErrors)
        ? validationErrors.map((item) => item.message).join(" • ")
        : serverMessage;

      toast.error(detailMessage);
    },
  });
};
