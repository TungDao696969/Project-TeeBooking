"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "@/schemas/auth.schema";

import { z } from "zod";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/services/auth.api";

import { useAuthStore } from "@/store/auth.store";

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type FormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();

  const forgotEmail = useAuthStore((state) => state.forgotEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      email: forgotEmail,
    },
  });

  const mutation = useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công");

      router.push("/login");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      console.log(axiosError.response);

      console.log(axiosError.response?.data);

      toast.error(axiosError.response?.data?.message || "Gửi OTP thất bại");
      
      toast.error("OTP không hợp lệ");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex w-[500px] items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-3xl font-extrabold uppercase text-white">
            Đặt lại mật khẩu
          </h1>

          <p className="mt-8 text-base leading-8 text-white font-medium">
            Nhập mã OTP đã được gửi về email của bạn
            <br />
            và tạo mật khẩu mới để tiếp tục
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-5">
          <div>
            <Input
              placeholder="Email"
              {...register("email")}
              className="
                h-16
                rounded-none
                border-0
                bg-[#E9E9E9]
                px-5
                text-lg
                text-black
                placeholder:text-gray-500
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Mã OTP"
              {...register("otp")}
              className="
                h-16
                rounded-none
                border-0
                bg-[#E9E9E9]
                px-5
                text-lg
                text-black
                placeholder:text-gray-500
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />

            {errors.otp && (
              <p className="mt-2 text-sm text-red-400">{errors.otp.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Mật khẩu mới"
              {...register("password")}
              className="
                h-16
                rounded-none
                border-0
                bg-[#E9E9E9]
                px-5
                text-lg
                text-black
                placeholder:text-gray-500
                focus-visible:ring-0
                focus-visible:ring-offset-0
              "
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="
              h-14
              w-full
              rounded-md
              bg-yellow-400
              text-xl
              font-extrabold
              uppercase
              tracking-wide
              text-black
              hover:bg-yellow-500
            "
          >
            {mutation.isPending ? "Đang xử lý..." : "Đổi mật khẩu"}
          </Button>
        </form>
      </div>
    </div>
  );
}
