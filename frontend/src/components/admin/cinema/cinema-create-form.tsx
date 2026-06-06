"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowUpDown,
  Building2,
  Clapperboard,
  Clock,
  Map,
  MapPin,
  Navigation,
  Phone,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useCreateCinema } from "@/hooks/admin/cinema/use-create-cinema";
import {
  CinemaFormInput,
  CinemaFormValues,
  cinemaSchema,
} from "@/schemas/admin/cinema.schema";
import { getCities } from "@/services/admin/cinema.service";
import { cn } from "@/lib/utils";

function FieldInput({
  label,
  icon: Icon,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ElementType;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-wide text-zinc-600 uppercase">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="absolute left-3 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
        )}
        <input
          {...props}
          className={cn(
            "w-full bg-[#171717] border border-[#2a2a2a] rounded-lg",
            "text-[13px] text-zinc-200 placeholder:text-zinc-700",
            "py-2.5 pr-3 outline-none transition-colors",
            "focus:border-[#E31E24]",
            Icon ? "pl-9" : "pl-3",
            error && "border-red-800",
          )}
        />
      </div>
      {error && <p className="text-[11px] text-[#E31E24]">{error}</p>}
    </div>
  );
}

function FieldSelect({
  label,
  icon: Icon,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  icon?: React.ElementType;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-wide text-zinc-600 uppercase">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="absolute left-3 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
        )}
        <select
          {...props}
          className={cn(
            "w-full bg-[#171717] border border-[#2a2a2a] rounded-lg",
            "text-[13px] text-zinc-200 py-2.5 pr-3 outline-none transition-colors",
            "focus:border-[#E31E24]",
            Icon ? "pl-9" : "pl-3",
            error && "border-red-800",
          )}
        >
          {children}
        </select>
      </div>
      {error && <p className="text-[11px] text-[#E31E24]">{error}</p>}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3 h-3 text-[#E31E24]" />
      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#E31E24]">
        {children}
      </span>
      <div className="flex-1 h-px bg-[#1e1e1e]" />
    </div>
  );
}

export function CinemaCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createCinemaMutation = useCreateCinema();
  const { data: cities = [], isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

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

  const onSubmit = (values: CinemaFormValues) => {
    createCinemaMutation.mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["cinemas"],
          exact: false,
        });

        router.push("/admin/cinema");
      },
    });
  };

  const err = form.formState.errors;

  return (
    <div className="bg-[#0d0d0d] rounded-2xl p-7 font-sans text-zinc-200">
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#1e1e1e]">
        <div className="w-10 h-10 bg-[#E31E24] rounded-lg flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bebas text-2xl tracking-widest text-white leading-none">
            Thêm rạp chiếu phim
          </h1>
          <p className="text-[11px] uppercase tracking-widest text-zinc-600 mt-0.5">
            Cinestar Admin - Tạo rạp mới
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section>
          <SectionHeading icon={Clapperboard}>Thông tin cơ bản</SectionHeading>
          <div className="grid grid-cols-2 gap-2.5">
            <FieldInput
              label="Tên rạp"
              icon={Clapperboard}
              placeholder="Cinestar Quốc Thanh"
              error={err.name?.message}
              {...form.register("name")}
            />
            <FieldInput
              label="Hotline"
              icon={Phone}
              placeholder="1900 2224"
              error={err.hotline?.message}
              {...form.register("hotline")}
            />
          </div>
        </section>

        <section>
          <SectionHeading icon={MapPin}>Địa chỉ</SectionHeading>
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <FieldSelect
              label="Thành phố"
              icon={Building2}
              error={err.cityId?.message}
              disabled={isLoadingCities}
              {...form.register("cityId")}
            >
              <option value="">
                {isLoadingCities ? "Đang tải thành phố..." : "Chọn thành phố"}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </FieldSelect>
            <FieldInput
              label="Tỉnh / Thành phố"
              icon={Building2}
              placeholder="Hồ Chí Minh"
              error={err.province?.message}
              {...form.register("province")}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <FieldInput
              label="Quận / Huyện"
              icon={Map}
              placeholder="Quận 3"
              error={err.district?.message}
              {...form.register("district")}
            />
            <FieldInput
              label="Phường / Xã"
              icon={Map}
              placeholder="Phường 2"
              error={err.ward?.message}
              {...form.register("ward")}
            />
          </div>
          <FieldInput
            label="Địa chỉ chi tiết"
            icon={MapPin}
            placeholder="271 Nguyễn Trãi, P.2, Q.3"
            error={err.address?.message}
            {...form.register("address")}
          />
        </section>

        {/* <section>
          <SectionHeading icon={Navigation}>Tọa độ bản đồ</SectionHeading>
          <div className="grid grid-cols-2 gap-2.5">
            <FieldInput
              label="Latitude"
              icon={ArrowUpDown}
              type="number"
              step="any"
              placeholder="10.7769"
              error={err.latitude?.message}
              {...form.register("latitude")}
            />
            <FieldInput
              label="Longitude"
              icon={ArrowLeftRight}
              type="number"
              step="any"
              placeholder="106.6983"
              error={err.longitude?.message}
              {...form.register("longitude")}
            />
          </div>
          <p className="text-[11px] text-zinc-700 italic mt-2">
            Dùng Google Maps để lấy tọa độ chính xác
          </p>
        </section> */}

        <section>
          <SectionHeading icon={Clock}>Vận hành</SectionHeading>
          <div className="max-w-[240px]">
            <FieldInput
              label="Giờ mở cửa"
              icon={Clock}
              placeholder="08:00 - 23:00"
              error={err.openingHours?.message}
              {...form.register("openingHours")}
            />
          </div>
        </section>

        <div className="flex gap-2.5 pt-5 border-t border-[#1e1e1e]">
          <button
            type="submit"
            disabled={createCinemaMutation.isPending || isLoadingCities}
            className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-[#c41920] disabled:opacity-50 text-white text-[13px] font-semibold rounded-lg px-5 py-2.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            {createCinemaMutation.isPending ? "Đang lưu..." : "Lưu rạp"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 border border-[#2a2a2a] hover:border-[#444] text-zinc-600 hover:text-zinc-300 text-[13px] rounded-lg px-4 py-2.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
