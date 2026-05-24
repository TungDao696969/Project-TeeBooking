"use client";

import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { otpSchema, OtpSchemaType } from "@/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { useVerifyOtp } from "@/hooks/auth/use-verify-otp";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const { mutate, isPending } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),

    defaultValues: {
      email,
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
      <div>
        <label className="mb-2 block font-semibold text-black">Email</label>

        <Input disabled {...register("email")} className="h-14 text-black" />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-black">Mã OTP</label>

        <Input
          placeholder="Nhập OTP"
          {...register("otp")}
          className="h-14 text-black"
        />

        {errors.otp && (
          <p className="mt-2 text-sm text-red-500">{errors.otp.message}</p>
        )}
      </div>

      <Button
        disabled={isPending}
        className="h-14 w-full bg-yellow-400 text-lg font-bold text-black hover:bg-yellow-500"
      >
        {isPending ? "Loading..." : "Xác nhận OTP"}
      </Button>
    </form>
  );
}
