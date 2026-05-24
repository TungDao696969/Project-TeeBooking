"use client";

import { verifyOtpApi } from "@/services/auth.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ApiErrorResponse = {
  message?: string;
};

const getApiErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (error.response?.data as ApiErrorResponse | undefined)?.message;
  }

  return undefined;
};

export const useVerifyOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyOtpApi,

    onSuccess: () => {
      toast.success("Xac thuc OTP thanh cong");
      router.push("/login");
    },

    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error) || "OTP khong hop le");
    },
  });
};
