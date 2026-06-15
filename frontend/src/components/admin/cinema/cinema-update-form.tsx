"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCinemaById } from "@/hooks/admin/cinema/use-cinemaById";
import { useUpdateCinema } from "@/hooks/admin/cinema/use-update-cinema";
import {
  CinemaFormInput,
  CinemaFormValues,
  cinemaSchema,
} from "@/schemas/admin/cinema.schema";
import { getCities } from "@/services/admin/cinema.service";

interface Props {
  cinemaId: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[#e50914] text-sm">{icon}</span>
      <span
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        className="text-xs tracking-[1.5px] uppercase text-[#e50914] font-semibold"
      >
        {children}
      </span>
    </div>
  );
}

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#2e2e2e] rounded-md px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444] outline-none transition-all focus:border-[#e50914] focus:ring-2 focus:ring-[#e50914]/20 disabled:opacity-40 disabled:cursor-not-allowed";

export function CinemaUpdateForm({ cinemaId }: Props) {
  const router = useRouter();
  const { data, isLoading } = useCinemaById(cinemaId);
  const { data: cities = [], isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
  const updateMutation = useUpdateCinema();

  const form = useForm<CinemaFormInput, unknown, CinemaFormValues>({
    resolver: zodResolver(cinemaSchema),
    defaultValues: {
      name: "",
      hotline: "",
      cityId: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      latitude: 0,
      longitude: 0,
      openingHours: "",
    },
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      name: data.name ?? "",
      hotline: data.hotline ?? "",
      cityId: data.cityId ?? "",
      province: data.province ?? "",
      district: data.district ?? "",
      ward: data.ward ?? "",
      address: data.address ?? "",
      latitude: data.latitude ?? 0,
      longitude: data.longitude ?? 0,
      openingHours: data.openingHours ?? "",
    });
  }, [data, form]);

  const onSubmit = (values: CinemaFormValues) => {
    updateMutation.mutate(
      { id: cinemaId, payload: values },
      {
        onSuccess: () => {
          router.push("/admin/cinema");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#666]">
          <div className="w-5 h-5 border-2 border-[#333] border-t-[#e50914] rounded-full animate-spin" />
          <span
            style={{ fontFamily: "'Nunito', sans-serif" }}
            className="text-sm"
          >
            Đang tải...
          </span>
        </div>
      </div>
    );
  }

  const errors = form.formState.errors;

  return (
    <>
      {/* Load Bebas Neue + Nunito */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;500;600;700&display=swap');
      `}</style>

      <div
        className="min-h-screen bg-[#0d0d0d]"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {/* Header */}
        <div className="bg-[#111] border-b-[3px] border-[#e50914] px-8 py-4 flex items-center gap-3">
          <span
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-3xl text-[#e50914] tracking-[2px] leading-none"
          >
            CINE<span className="text-white">STAR</span>
          </span>
          <span className="text-[#e50914] text-xl leading-none">★</span>
          <div className="ml-auto text-xs text-[#666] tracking-wide">
            Quản trị /{" "}
            <span className="text-[#e50914] font-semibold">
              Cập nhật rạp chiếu phim
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Page title */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-7 bg-[#e50914] rounded-sm" />
            <h1
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-2xl text-white tracking-[2px]"
            >
              Cập nhật rạp chiếu phim
            </h1>
          </div>
          <p className="text-xs text-[#555] mb-7 ml-4 tracking-wide">
            Chỉnh sửa thông tin chi tiết của rạp trong hệ thống
          </p>

          {/* Form card */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-[#161616] border border-[#2a2a2a] rounded-xl overflow-hidden"
          >
            {/* Section 1: Thông tin cơ bản */}
            <div className="px-6 pt-5 pb-5 border-b border-[#222]">
              <SectionTitle icon="🏢">Thông tin cơ bản</SectionTitle>
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Tên rạp
                  </label>
                  <input
                    className={inputClass}
                    placeholder="VD: Cinestar Quốc Thanh"
                    {...form.register("name")}
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Hotline
                  </label>
                  <input
                    className={inputClass}
                    placeholder="VD: 1900 2224"
                    {...form.register("hotline")}
                  />
                  <FieldError message={errors.hotline?.message} />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Thành phố
                  </label>
                  <select
                    disabled={isLoadingCities}
                    {...form.register("cityId")}
                    className={inputClass}
                  >
                    <option value="">
                      {isLoadingCities
                        ? "Đang tải thành phố..."
                        : "Chọn thành phố"}
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.cityId?.message} />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Giờ mở cửa
                  </label>
                  <input
                    className={inputClass}
                    placeholder="VD: 08:00 - 23:30"
                    {...form.register("openingHours")}
                  />
                  <FieldError message={errors.openingHours?.message} />
                </div>
              </div>
            </div>
            {/* Section 2: Địa chỉ */}
            <div className="px-6 pt-5 pb-5 border-b border-[#222]">
              <SectionTitle icon="📍">Địa chỉ</SectionTitle>
              <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Tỉnh / Thành phố
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Province"
                    {...form.register("province")}
                  />
                  <FieldError message={errors.province?.message} />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Quận / Huyện
                  </label>
                  <input
                    className={inputClass}
                    placeholder="District"
                    {...form.register("district")}
                  />
                  <FieldError message={errors.district?.message} />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Phường / Xã
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Ward"
                    {...form.register("ward")}
                  />
                  <FieldError message={errors.ward?.message} />
                </div>

                <div className="col-span-3">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Địa chỉ cụ thể
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Số nhà, tên đường..."
                    {...form.register("address")}
                  />
                  <FieldError message={errors.address?.message} />
                </div>
              </div>
            </div>
            {/* Section 3: Tọa độ
            <div className="px-6 pt-5 pb-5">
              <SectionTitle icon="🧭">Tọa độ bản đồ</SectionTitle>
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Vĩ độ (Latitude)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    className={inputClass}
                    placeholder="10.7760"
                    {...form.register("latitude", { valueAsNumber: true })}
                  />
                  <FieldError message={errors.latitude?.message} />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.4px] text-[#777] mb-1.5">
                    Kinh độ (Longitude)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    className={inputClass}
                    placeholder="106.6971"
                    {...form.register("longitude", { valueAsNumber: true })}
                  />
                  <FieldError message={errors.longitude?.message} />
                </div>
              </div>
            </div> */}
            {/* Actions */}
            <div className="px-6 py-4 bg-[#111] border-t border-[#222] flex items-center gap-3">
              <button
                type="submit"
                disabled={updateMutation.isPending || isLoadingCities}
                className="flex items-center gap-2 px-5 py-2 bg-[#e50914] text-white text-sm font-bold rounded-md tracking-wide transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {updateMutation.isPending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Cập nhật
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 px-5 py-2 bg-transparent border border-[#333] text-[#888] text-sm font-semibold rounded-md tracking-wide transition-colors hover:bg-[#1e1e1e] hover:text-[#ccc]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
