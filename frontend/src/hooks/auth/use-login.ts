"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { loginService } from "@/services/auth.api";
import { useAuthStore } from "@/store/auth.store";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginService,

    onSuccess: (data) => {
      setUser(data.data);

      toast.success("Dang nhap thanh cong");

      window.location.href = "/";
    },

    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)?.message
          : undefined;

      toast.error(message || "Dang nhap that bai");
    },
  });
};
