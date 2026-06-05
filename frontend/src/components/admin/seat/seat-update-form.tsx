"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateSeatSchema,
  UpdateSeatFormData,
} from "@/schemas/admin/seat.schema";
import { SeatDetail } from "@/types/admin/seat.type";
import Link from "next/link";
interface Props {
  initialData?: SeatDetail;
  onSubmit: (data: UpdateSeatFormData) => void;
  loading?: boolean;
}

const SEAT_TYPE_CONFIG = {
  standard: {
    label: "Standard",
    icon: "🪑",
    desc: "Ghế tiêu chuẩn",
    accent: "text-zinc-300",
  },
  vip: {
    label: "VIP",
    icon: "⭐",
    desc: "Ghế VIP cao cấp",
    accent: "text-yellow-400",
  },
  couple: {
    label: "Couple",
    icon: "💑",
    desc: "Ghế đôi lãng mạn",
    accent: "text-pink-400",
  },
};

export default function SeatFormUpdate({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const form = useForm<UpdateSeatFormData>({
    resolver: zodResolver(updateSeatSchema),
    defaultValues: {
      seatCode: "",
      seatRow: "",
      seatNumber: 1,
      seatType: "standard",
      extraPrice: 0,
    },
  });

  const watchedType = form.watch("seatType");

  useEffect(() => {
    if (initialData) {
      form.reset({
        seatCode: initialData.seatCode,
        seatRow: initialData.seatRow ?? "",
        seatNumber: initialData.seatNumber,
        seatType: initialData.seatType as UpdateSeatFormData["seatType"],
        extraPrice: initialData.extraPrice ?? 0,
      });
    }
  }, [initialData, form]);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-10"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-600/60" />
            <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-semibold">
              Cinestar Admin
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-600/60" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Cập Nhật Thông Tin Ghế
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Chỉnh sửa thông tin ghế trong phòng chiếu
          </p>
        </div>

        <div className="mb-4">
          <Link
            href="/admin/seat"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Quay về danh sách ghế
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          {/* Top accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-7 space-y-5"
          >
            {/* Row: Seat Code + Seat Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Mã Ghế
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-sm font-bold select-none">
                    #
                  </span>
                  <input
                    {...form.register("seatCode")}
                    placeholder="A01"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-2.5
                               text-white placeholder-zinc-600 text-sm
                               focus:outline-none focus:border-red-600/70 focus:bg-white/[0.06]
                               transition-all duration-200"
                  />
                </div>
                {form.formState.errors.seatCode && (
                  <p className="text-red-400 text-xs mt-1">
                    {form.formState.errors.seatCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Hàng
                </label>
                <input
                  {...form.register("seatRow")}
                  placeholder="A"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5
                             text-white placeholder-zinc-600 text-sm
                             focus:outline-none focus:border-red-600/70 focus:bg-white/[0.06]
                             transition-all duration-200"
                />
                {form.formState.errors.seatRow && (
                  <p className="text-red-400 text-xs mt-1">
                    {form.formState.errors.seatRow.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row: Seat Number + Extra Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Số Ghế
                </label>
                <input
                  type="number"
                  {...form.register("seatNumber", { valueAsNumber: true })}
                  placeholder="1"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5
                             text-white placeholder-zinc-600 text-sm
                             focus:outline-none focus:border-red-600/70 focus:bg-white/[0.06]
                             transition-all duration-200"
                />
                {form.formState.errors.seatNumber && (
                  <p className="text-red-400 text-xs mt-1">
                    {form.formState.errors.seatNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Phụ Thu (VNĐ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    {...form.register("extraPrice", { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 pr-10 py-2.5
                               text-white placeholder-zinc-600 text-sm
                               focus:outline-none focus:border-red-600/70 focus:bg-white/[0.06]
                               transition-all duration-200"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs select-none">
                    ₫
                  </span>
                </div>
                {form.formState.errors.extraPrice && (
                  <p className="text-red-400 text-xs mt-1">
                    {form.formState.errors.extraPrice.message}
                  </p>
                )}
              </div>
            </div>

            {/* Seat Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Loại Ghế
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  Object.keys(SEAT_TYPE_CONFIG) as Array<
                    keyof typeof SEAT_TYPE_CONFIG
                  >
                ).map((type) => {
                  const config = SEAT_TYPE_CONFIG[type];
                  const isActive = watchedType === type;
                  return (
                    <label
                      key={type}
                      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border cursor-pointer
                                    transition-all duration-200 select-none
                                    ${
                                      isActive
                                        ? "border-red-600/70 bg-red-950/40 shadow-lg shadow-red-900/20"
                                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                                    }`}
                    >
                      <input
                        type="radio"
                        {...form.register("seatType")}
                        value={type}
                        className="sr-only"
                      />
                      <span className="text-xl leading-none">
                        {config.icon}
                      </span>
                      <span
                        className={`text-xs font-bold ${isActive ? "text-red-400" : "text-zinc-400"}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-[10px] text-zinc-600 text-center leading-tight">
                        {config.desc}
                      </span>
                      {isActive && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.05]" />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden rounded-xl py-3 px-6
                         bg-gradient-to-r from-red-700 to-red-600
                         text-white text-sm font-bold tracking-wider uppercase
                         hover:from-red-600 hover:to-red-500
                         active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200
                         shadow-lg shadow-red-900/40
                         group"
            >
              {/* Shine effect */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                               -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Cập Nhật Ghế
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-5 tracking-wide">
          CINESTAR © {new Date().getFullYear()} — Hệ thống quản lý rạp chiếu
          phim
        </p>
      </div>
    </div>
  );
}
