"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterSchemaType } from "@/schemas/auth.schema";

import { useRegister } from "@/hooks/auth/use-register";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm({ setIsRegister }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "male",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await mutateAsync({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
      });
    } catch (error: any) {
      const responseData = error?.response?.data;
      const message = responseData?.message;
      if (message === "Email already exists") {
        setError("email", { type: "server", message: "Email đã tồn tại" });
      } else if (message === "Phone already exists") {
        setError("phone", { type: "server", message: "Số điện thoại đã tồn tại" });
      } else if (message === "Failed to send verification email") {
        setError("email", { type: "server", message: "Email không tồn tại hoặc không thể gửi mã OTP" });
      }
    }
  };

  return (
    <div className="w-full bg-white p-5 sm:p-10 shadow-2xl">
      {/* Tabs */}
      <div className="mb-6 sm:mb-10 flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setIsRegister(false)}
          className="flex-1 pb-3 sm:pb-4 text-center text-lg sm:text-2xl font-black uppercase text-gray-400 transition hover:text-black"
        >
          Đăng nhập
        </button>

        <button
          type="button"
          className="flex-1 border-b-4 border-purple-600 pb-3 sm:pb-4 text-center text-lg sm:text-2xl font-black uppercase text-black"
        >
          Đăng ký
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Name */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Họ và tên
          </label>

          <Input
            placeholder="Nhập họ tên..."
            {...register("fullName")}
            className="h-14 rounded-none border border-gray-300 px-4 text-black text-base focus-visible:ring-0"
          />

          {errors.fullName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Email
          </label>

          <Input
            placeholder="Nhập email..."
            {...register("email")}
            className="h-14 rounded-none border border-gray-300 px-4 text-black text-base focus-visible:ring-0"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* phone */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Số điện thoại
          </label>

          <Input
            placeholder="Nhập số điện thoại..."
            {...register("phone", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
            className="h-14 rounded-none border border-gray-300 px-4 text-black text-base focus-visible:ring-0"
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* gender */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Giới tính
          </label>

          <select
            {...register("gender")}
            className="h-14 w-full rounded-none border border-gray-300 px-4 text-black outline-none"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>

          {errors.gender && (
            <p className="mt-2 text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        {/* birth */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Ngày sinh
          </label>

          <Input
            type="date"
            {...register("dateOfBirth")}
            className="h-14 rounded-none border border-gray-300 px-4 text-black text-base focus-visible:ring-0"
          />

          {errors.dateOfBirth && (
            <p className="mt-2 text-sm text-red-500">
              {errors.dateOfBirth.message}
            </p>
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
              placeholder="Nhập mật khẩu..."
              {...register("password")}
              className="h-14 rounded-none border border-gray-300 px-4 pr-12 text-black text-base focus-visible:ring-0"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-3 block text-base font-semibold text-black">
            Nhập lại mật khẩu
          </label>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu..."
              {...register("confirmPassword")}
              className="h-14 rounded-none border border-gray-300 px-4 pr-12 text-black text-base focus-visible:ring-0"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          disabled={isPending}
          type="submit"
          className="h-14 w-full rounded-none bg-yellow-400 text-lg font-black uppercase text-black hover:bg-yellow-500"
        >
          {isPending ? "Loading..." : "Đăng ký"}
        </Button>
      </form>
    </div>
  );
}
