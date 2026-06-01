"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, MovieFormData } from "@/schemas/admin/movie.schema";
import { useCreateMovie } from "@/hooks/admin/movie/use-create-movie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function MovieForm() {
  const [posterPreview, setPosterPreview] = useState("");

  const [bannerPreview, setBannerPreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      durationMinutes: 120,
      releaseDate: "",
      ageRating: "C16",
      language: "English",
      subtitle: "Tiếng Việt",
      trailerUrl: "",
      poster: undefined,
      banner: undefined,
      country: "",
      producer: "",
      status: "coming_soon",
    },
  });

  const router = useRouter();
  const { mutateAsync: createMovie } = useCreateMovie();
  const status = watch("status");

  const onSubmit = async (values: MovieFormData) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);

      formData.append("description", values.description);

      formData.append("durationMinutes", String(values.durationMinutes));

      formData.append("releaseDate", values.releaseDate);

      formData.append("ageRating", values.ageRating);

      formData.append("language", values.language);

      formData.append("subtitle", values.subtitle);

      formData.append("trailerUrl", values.trailerUrl ?? "");

      formData.append("country", values.country);

      formData.append("producer", values.producer);

      formData.append("status", values.status);

      formData.append("poster", values.poster);

      formData.append("banner", values.banner);

      await createMovie(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#1a1a26] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 px-7 py-5 border-b border-yellow-500/20 bg-red-600/5">
        <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-sm tracking-tighter shrink-0">
          CS
        </div>
        <div>
          <h2 className="text-base font-medium text-white">Thêm phim mới</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Cinestar Cinema Management
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-yellow-400 px-3 py-1">
          <Button variant="outline" asChild>
            <Link href="/admin/movie">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </Link>
          </Button>
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-7 py-6 space-y-6">
        {/* Section: Thông tin cơ bản */}
        <SectionLabel>Thông tin cơ bản</SectionLabel>

        <div className="grid grid-cols-2 gap-3.5">
          <Field label="Tên phim" error={errors.title?.message}>
            <input
              className={inputCls}
              placeholder="VD: Avengers: Endgame"
              {...register("title")}
            />
          </Field>

          <Field
            label="Thời lượng (phút)"
            error={errors.durationMinutes?.message}
          >
            <input
              type="number"
              className={inputCls}
              {...register("durationMinutes", { valueAsNumber: true })}
            />
          </Field>

          <Field label="Ngày chiếu" error={errors.releaseDate?.message}>
            <input
              type="date"
              className={inputCls}
              {...register("releaseDate")}
            />
          </Field>

          <Field label="Giới hạn tuổi">
            <select className={inputCls} {...register("ageRating")}>
              <option value="P">P — Mọi lứa tuổi</option>
              <option value="C13">C13 — Trên 13 tuổi</option>
              <option value="C16">C16 — Trên 16 tuổi</option>
              <option value="C18">C18 — Trên 18 tuổi</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-3.5">
          <Field label="Ngôn ngữ">
            <input
              className={inputCls}
              placeholder="English"
              {...register("language")}
            />
          </Field>
          <Field label="Phụ đề">
            <input
              className={inputCls}
              placeholder="Tiếng Việt"
              {...register("subtitle")}
            />
          </Field>
          <Field label="Quốc gia">
            <input
              className={inputCls}
              placeholder="USA"
              {...register("country")}
            />
          </Field>
        </div>

        <Field label="Nhà sản xuất" className="max-w-[50%]">
          <input
            className={inputCls}
            placeholder="VD: Marvel Studios"
            {...register("producer")}
          />
        </Field>

        {/* Section: Hình ảnh & Trailer */}
        <SectionLabel>Hình ảnh & Trailer</SectionLabel>

        <div className="grid grid-cols-2 gap-3.5">
          <Field label="Trailer URL" error={errors.trailerUrl?.message}>
            <input
              className={inputCls}
              placeholder="https://youtube.com/watch?v=..."
              {...register("trailerUrl")}
            />
          </Field>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Poster</label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setValue("poster", file);

                setPosterPreview(URL.createObjectURL(file));
              }}
            />

            {posterPreview && (
              <img
                src={posterPreview}
                alt="Poster Preview"
                className="h-64 rounded-lg object-cover"
              />
            )}

            {errors.poster && (
              <p className="text-sm text-red-500">{errors.poster.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Banner</label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setValue("banner", file);

              setBannerPreview(URL.createObjectURL(file));
            }}
          />

          {bannerPreview && (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="h-48 w-full rounded-lg object-cover"
            />
          )}

          {errors.banner && (
            <p className="text-sm text-red-500">{errors.banner.message}</p>
          )}
        </div>

        {/* Section: Nội dung & Trạng thái */}
        <SectionLabel>Nội dung & Trạng thái</SectionLabel>

        <Field label="Mô tả phim" error={errors.description?.message}>
          <textarea
            rows={5}
            className={inputCls + " resize-y"}
            placeholder="Nhập nội dung tóm tắt phim..."
            {...register("description")}
          />
        </Field>

        {/* Status radio */}
        <Field label="Trạng thái chiếu">
          <div className="grid grid-cols-3 gap-2 mt-1">
            {(
              [
                { value: "coming_soon", label: "Sắp chiếu" },
                { value: "now_showing", label: "Đang chiếu" },
                { value: "ended", label: "Đã kết thúc" },
              ] as const
            ).map((opt) => {
              const active = status === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all
                    ${
                      active
                        ? opt.value === "ended"
                          ? "border-red-600 bg-red-600/10 text-red-400"
                          : "border-yellow-400 bg-yellow-400/8 text-yellow-400"
                        : "border-yellow-500/20 bg-[#0e0e16] text-zinc-500 hover:border-yellow-500/40 hover:text-zinc-300"
                    }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    value={opt.value}
                    checked={status === opt.value}
                    onChange={() => setValue("status", opt.value)}
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </Field>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 pt-2 border-t border-yellow-500/15 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-zinc-400 border border-yellow-500/20 rounded-lg hover:border-yellow-500/40 hover:text-white transition-colors"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Đang lưu..." : "Lưu phim"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Helpers
const inputCls =
  "w-full bg-[#0e0e16] border border-yellow-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 hover:border-yellow-500/40 transition-colors";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-red-500">
      {children}
      <span className="flex-1 h-px bg-yellow-500/15" />
    </div>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-xs font-medium text-zinc-400">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
