"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { loginService } from "@/services/auth.api";
import { useAuthStore } from "@/store/auth.store";

import { LoginPayload, LoginResponse } from "@/types/auth.type";

export const useLogin = () => {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: loginService,

    onSuccess: (data) => {
      setAuth(data.data.user, data.data.accessToken);

      toast.success("Đăng nhập thành công");

      if (data.data.user.role === "admin") {
        router.push("/admin/dashboard");
        return;
      }

      router.push("/");
    },

    onError: (error: unknown) => {
      const data = error instanceof AxiosError ? error.response?.data : undefined;
      let message = data?.message;
      if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        message = data.errors[0].message;
      }

      toast.error(message || "Đăng nhập thất bại");
    },
  });
};
