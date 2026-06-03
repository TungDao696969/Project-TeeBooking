"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  ShowtimeFormData,
  createShowtimeSchema,
} from "@/schemas/admin/showtime.schema";
import { useCreateShowtime } from "@/hooks/admin/showtime/use-create-showtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const FORMAT_OPTIONS = ["2D", "3D", "IMAX", "4DX"] as const;

export default function ShowtimeForm() {
  const { mutate, isPending } = useCreateShowtime();
  const [selectedFormat, setSelectedFormat] = useState<string>("2D");
  const router = useRouter();
  const form = useForm<ShowtimeFormData>({
    resolver: zodResolver(createShowtimeSchema),
    defaultValues: {
      movieId: "",
      roomId: "",
      showDate: "",
      startTime: "",
      endTime: "",
      basePrice: 0,
      format: "2D",
      language: "English",
      subtitle: "Tiếng Việt",
    },
  });

  const onSubmit: SubmitHandler<ShowtimeFormData> = (values) => {
    mutate({
      ...values,
      showDate: new Date(values.showDate).toISOString(),
      startTime: new Date(values.startTime).toISOString(),
      endTime: new Date(values.endTime).toISOString(),
    });
  };

  return (
    <div className="bg-[#0f0d0d] rounded-2xl p-7 font-serif">
      {/* Header */}
      <div className="flex items-center justify-between mb-7 pb-5 border-b border-[#2a2020]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-700 rounded-lg flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m17.25-11.25H6.375a1.125 1.125 0 00-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M17.625 4.5h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m1.5-3.75C21 4.5 21.5 5 21.5 5.625v12.75c0 .621-.504 1.125-1.125 1.125m-1.5 0H6.375"
              />
            </svg>
          </div>

          <div>
            <p className="text-[#f0e8e0] text-lg tracking-wide">
              TẠO SUẤT CHIẾU
            </p>

            <p className="text-[#7a6a60] text-xs tracking-widest uppercase font-sans mt-0.5">
              CineStart Admin
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-[#2e2220] bg-[#1a1412] text-[#f0e8e0] hover:bg-[#241917] hover:text-white"
        >
          ← Quay về
        </Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Section: Phim & Phòng */}
          <SectionLabel>Thông tin phim &amp; phòng</SectionLabel>

          <Field label="Movie ID">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a4030]">
                <FilmIcon />
              </span>
              <Input
                {...form.register("movieId")}
                placeholder="movie_xxxxxx"
                className="bg-[#1a1412] border-[#2e2220] text-[#f0e8e0] placeholder:text-[#4a3830] focus:border-red-700 pl-9 font-sans"
              />
            </div>
          </Field>

          <Field label="Room ID">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a4030]">
                <BuildingIcon />
              </span>
              <Input
                {...form.register("roomId")}
                placeholder="room_xxxxxx"
                className="bg-[#1a1412] border-[#2e2220] text-[#f0e8e0] placeholder:text-[#4a3830] focus:border-red-700 pl-9 font-sans"
              />
            </div>
          </Field>

          {/* Section: Lịch chiếu */}
          <SectionLabel>Lịch chiếu</SectionLabel>

          <div className="col-span-2">
            <Field label="Ngày chiếu">
              <Input
                type="date"
                {...form.register("showDate")}
                className="bg-[#1a1412] border-[#2e2220] text-[#f0e8e0] focus:border-red-700 font-sans [color-scheme:dark]"
              />
            </Field>
          </div>

          <Field label="Giờ bắt đầu">
            <Input
              type="datetime-local"
              {...form.register("startTime")}
              className="bg-[#1a1412] border-[#2e2220] text-[#f0e8e0] focus:border-red-700 font-sans [color-scheme:dark]"
            />
          </Field>

          <Field label="Giờ kết thúc">
            <Input
              type="datetime-local"
              {...form.register("endTime")}
              className="bg-[#1a1412] border-[#2e2220] text-[#f0e8e0] focus:border-red-700 font-sans [color-scheme:dark]"
            />
          </Field>

          {/* Section: Cài đặt vé */}
          <SectionLabel>Cài đặt vé</SectionLabel>

          <Field label="Giá vé (VNĐ)">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 font-semibold text-sm font-sans">
                ₫
              </span>
              <Input
                type="number"
                {...form.register("basePrice", { valueAsNumber: true })}
                placeholder="75000"
                className="bg-[#1a1412] border-[#2e2220] text-[#f0e8e0] placeholder:text-[#4a3830] focus:border-red-700 pl-7 font-sans"
              />
            </div>
          </Field>

          <Field label="Ngôn ngữ">
            <select
              {...form.register("language")}
              className="w-full bg-[#1a1412] border border-[#2e2220] rounded-md px-3 py-2 text-[#f0e8e0] text-sm font-sans outline-none focus:border-red-700 appearance-none transition-colors"
            >
              <option value="English">English</option>
              <option value="Vietnamese">Tiếng Việt</option>
              <option value="Korean">한국어</option>
              <option value="Japanese">日本語</option>
            </select>
          </Field>

          <Field label="Phụ đề">
            <select
              {...form.register("subtitle")}
              className="w-full bg-[#1a1412] border border-[#2e2220] rounded-md px-3 py-2 text-[#f0e8e0] text-sm font-sans outline-none focus:border-red-700 appearance-none transition-colors"
            >
              <option value="Tiếng Việt">Tiếng Việt</option>
              <option value="English">English</option>
              <option value="None">Không có</option>
            </select>
          </Field>

          <Field label="Định dạng">
            <div className="flex gap-2 flex-wrap">
              {FORMAT_OPTIONS.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => {
                    setSelectedFormat(fmt);
                    form.setValue("format", fmt);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans tracking-wide border transition-all ${
                    selectedFormat === fmt
                      ? "bg-[#2a0e0c] border-red-700 text-red-400"
                      : "bg-[#1a1412] border-[#2e2220] text-[#7a6060] hover:border-[#5a3030]"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="col-span-2 mt-2 bg-red-700 hover:bg-red-800 text-white font-sans tracking-wide border-none h-11"
          >
            {isPending ? "Đang tạo..." : "Tạo suất chiếu"}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] text-[#8a7060] tracking-widest uppercase font-sans font-medium">
        {label}
      </span>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-2 flex items-center gap-2 text-[11px] text-[#5a4030] tracking-widest uppercase font-sans">
      {children}
      <span className="flex-1 h-px bg-[#1e1614]" />
    </div>
  );
}

function FilmIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25M3.375 4.5h17.25M5.625 4.5v15m12.75-15v15M9 4.5v15m6-15v15"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21"
      />
    </svg>
  );
}
