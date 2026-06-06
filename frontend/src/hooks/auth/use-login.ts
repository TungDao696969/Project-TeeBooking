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
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)?.message
          : undefined;

      toast.error(message || "Đăng nhập thất bại");
    },
  });
};
