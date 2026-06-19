"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchemaType } from "@/schemas/auth.schema";

import { useLogin } from "@/hooks/auth/use-login";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "./google-login-button";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
interface LoginFormProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setIsRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const remember = watch("remember");

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <div className="w-full bg-white p-5 sm:p-10 shadow-2xl">
      {/* Tabs */}
      <div className="mb-6 sm:mb-10 flex border-b border-gray-200">
        <button
          type="button"
          className="flex-1 border-b-4 border-purple-600 pb-3 sm:pb-4 text-center text-lg sm:text-2xl font-black uppercase text-black"
        >
          Đăng nhập
        </button>

        <button
          type="button"
          onClick={() => setIsRegister(true)}
          className="flex-1 pb-3 sm:pb-4 text-center text-lg sm:text-2xl font-black uppercase text-gray-400 transition hover:text-black"
        >
          Đăng ký
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Email */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Tài khoản, Email hoặc số điện thoại
          </label>

          <Input
            {...register("email")}
            placeholder="Nhập email..."
            className="h-14 rounded-none border border-gray-300 px-4 text-black text-base focus-visible:ring-0"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Mật khẩu
          </label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Nhập mật khẩu..."
              className="h-14 rounded-none border border-gray-300 px-4 pr-12 text-black text-base focus-visible:ring-0"
            />

            <button
              type="button"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              aria-pressed={showPassword}
              className="absolute right-4 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5" aria-hidden="true" />
              ) : (
                <Eye className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setValue("remember", e.target.checked)}
              className="h-4 w-4"
            />

            <label htmlFor="remember" className="text-sm text-black">
              Lưu mật khẩu đăng nhập
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-500 underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit */}
        <Button
          disabled={isPending}
          type="submit"
          className="h-14 w-full rounded-none bg-yellow-400 text-lg font-black uppercase text-black hover:bg-yellow-500"
        >
          {isPending ? "Loading..." : "Đăng nhập"}
        </Button>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
          <GoogleLoginButton />

          <Button
            disabled={isPending}
            type="button"
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-gray-300 bg-[#1877F2] px-6 text-base font-semibold text-white hover:bg-[#166fe5]"
          >
            <FaFacebookF className="size-5" aria-hidden="true" />

            {isPending ? "Loading..." : "Đăng nhập bằng Facebook"}
          </Button>
        </div>
      </form>
    </div>
  );
}
