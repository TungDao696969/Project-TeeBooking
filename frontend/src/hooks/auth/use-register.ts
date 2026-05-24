import { registerApi } from "@/services/auth.api";
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

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (_, variables) => {
      toast.success("OTP da duoc gui toi email");
      router.push(`/verify-otp?email=${encodeURIComponent(variables.email)}`);
    },

    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error) || "Dang ky that bai");
    },
  });
};
