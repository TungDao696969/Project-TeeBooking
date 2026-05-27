"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schemas/auth.schema";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "@/services/auth.api";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { AxiosError } from "axios";
type FormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();

  const setForgotEmail = useAuthStore((state) => state.setForgotEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (_, variables) => {
      toast.success("Đã gửi OTP");

      setForgotEmail(variables.email);

      router.push("/reset-password");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      console.log(axiosError.response);

      console.log(axiosError.response?.data);

      toast.error(axiosError.response?.data?.message || "Gửi OTP thất bại");

      toast.error("Gửi OTP thất bại");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-[500px] flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-5xl md:text-3xl font-extrabold uppercase text-white tracking-wide">
          Quên mật khẩu
        </h1>

        <p className="mt-8 text-white text-base leading-8 font-medium">
          Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn
          <br />
          hướng dẫn để tạo mật khẩu mới
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
          <div>
            <Input
              placeholder="Email"
              {...register("email")}
              className="
                h-16
                rounded-none
                border-0
                bg-[#E8E8E8]
                text-black
                placeholder:text-gray-500
                text-lg
                px-5
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400 text-left">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="
              w-full
              h-14
              rounded-md
              bg-yellow-400
              hover:bg-yellow-500
              text-black
              font-extrabold
              uppercase
              text-xl
              tracking-wide
            "
          >
            {mutation.isPending ? "Đang gửi..." : "Gửi mã xác minh"}
          </Button>
        </form>
      </div>
    </div>
  );
}
