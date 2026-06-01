"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  movieUpdateSchema,
  MovieUpdateFormData,
} from "@/schemas/admin/movie.schema";
import { useMovieById } from "@/hooks/admin/movie/use-movie-detail";
import { useUpdateMovie } from "@/hooks/admin/movie/use-update-movie";
import { useRouter } from "next/navigation";
import { UseFormRegisterReturn } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  movieId: string;
}

const inputCls =
  "w-full bg-[#0e0e16] border border-yellow-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 " +
  "focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/15 hover:border-yellow-500/40 transition-colors";

export default function MovieUpdateForm({ movieId }: Props) {
  const router = useRouter();
  const { data } = useMovieById(movieId);
  const { mutateAsync, isPending } = useUpdateMovie();
  const [isDirty, setIsDirty] = useState(false);
  const [posterName, setPosterName] = useState<string | null>(null);
  const [bannerName, setBannerName] = useState<string | null>(null);

  const { register, reset, handleSubmit, watch, setValue } =
    useForm<MovieUpdateFormData>({ resolver: zodResolver(movieUpdateSchema) });

  const status = watch("status");

  useEffect(() => {
    if (!data?.data) return;
    const m = data.data;
    reset({
      title: m.title,
      description: m.description,
      durationMinutes: m.durationMinutes,
      releaseDate: m.releaseDate?.split("T")[0],
      ageRating: m.ageRating,
      language: m.language,
      subtitle: m.subtitle,
      trailerUrl: m.trailerUrl,
      country: m.country,
      producer: m.producer,
      status: m.status,
    });
  }, [data, reset]);

  const onSubmit = async (values: MovieUpdateFormData) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      if (value instanceof FileList) {
        const file = value.item(0);
        if (file) formData.append(key, file);
        return;
      }
      formData.append(key, String(value));
    });
    await mutateAsync({ id: movieId, data: formData });
    setIsDirty(false);
  };

  const mark = () => setIsDirty(true);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#1a1a26] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-7 py-5 border-b border-yellow-500/20 bg-red-600/5">
        <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-xs tracking-tighter shrink-0">
          CS
        </div>
        <div>
          <h2 className="text-[15px] font-medium text-white">Cập nhật phim</h2>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Chỉnh sửa thông tin phim trong hệ thống
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

      <form onSubmit={handleSubmit(onSubmit)} onChange={mark}>
        <div className="px-7 py-6 space-y-5">
          {/* Thông tin cơ bản */}
          <SectionLabel>Thông tin cơ bản</SectionLabel>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tên phim" className="col-span-2">
              <input
                className={inputCls}
                placeholder="VD: Avengers: Endgame"
                {...register("title")}
              />
            </Field>
            <Field label="Thời lượng (phút)">
              <input
                type="number"
                className={inputCls}
                {...register("durationMinutes", { valueAsNumber: true })}
              />
            </Field>
            <Field label="Ngày chiếu">
              <input
                type="date"
                className={inputCls}
                {...register("releaseDate")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Giới hạn tuổi">
              <select className={inputCls} {...register("ageRating")}>
                <option value="P">P — Mọi lứa tuổi</option>
                <option value="C13">C13 — Trên 13 tuổi</option>
                <option value="C16">C16 — Trên 16 tuổi</option>
                <option value="C18">C18 — Trên 18 tuổi</option>
              </select>
            </Field>
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
            <Field label="Nhà sản xuất">
              <input
                className={inputCls}
                placeholder="Marvel Studios"
                {...register("producer")}
              />
            </Field>
            <Field label="Trailer URL">
              <input
                type="url"
                className={inputCls}
                placeholder="https://youtube.com/..."
                {...register("trailerUrl")}
              />
            </Field>
          </div>

          <Field label="Mô tả phim">
            <textarea
              rows={4}
              className={inputCls + " resize-y"}
              placeholder="Nội dung tóm tắt..."
              {...register("description")}
            />
          </Field>

          {/* Trạng thái */}
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
                const isEnded = opt.value === "ended";
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all
                      ${
                        active
                          ? isEnded
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
                      onChange={() => {
                        setValue("status", opt.value);
                        mark();
                      }}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </Field>

          {/* Hình ảnh */}
          <SectionLabel>Hình ảnh</SectionLabel>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Poster phim">
              <UploadZone
                label="Tải lên poster mới"
                hint="PNG, JPG tối đa 5MB"
                fileName={posterName}
                register={register("poster")}
                onChange={(name) => {
                  setPosterName(name);
                  mark();
                }}
              />
            </Field>
            <Field label="Banner phim">
              <UploadZone
                label="Tải lên banner mới"
                hint="Khuyến nghị 1920×600"
                fileName={bannerName}
                register={register("banner")}
                onChange={(name) => {
                  setBannerName(name);
                  mark();
                }}
              />
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-6 pt-4 flex items-center justify-between border-t border-yellow-500/15">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-zinc-500">
              ID: <code className="text-yellow-400">{movieId}</code>
            </span>
            {isDirty && (
              <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-0.5 rounded-full">
                Có thay đổi chưa lưu
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm text-zinc-400 border border-yellow-500/20 rounded-lg hover:border-yellow-500/40 hover:text-white transition-colors"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-60"
            >
              {isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// --- Helpers ---

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
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-[11px] font-medium text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

function UploadZone({
  label,
  hint,
  fileName,
  register,
  onChange,
}: {
  label: string;
  hint: string;
  fileName: string | null;

  register: UseFormRegisterReturn;

  onChange: (name: string) => void;
}) {
  const { ref, ...rest } = register;

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={`relative border border-dashed rounded-xl bg-[#0e0e16] p-5 text-center cursor-pointer transition-colors
      ${
        fileName
          ? "border-yellow-400/50"
          : "border-yellow-500/20 hover:border-yellow-500/40"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        {...rest}
        ref={(el) => {
          inputRef.current = el;

          if (typeof ref === "function") {
            ref(el);
          }
        }}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onChange(file.name);
          }
        }}
      />

      <div className="text-2xl text-zinc-500 mb-1.5">↑</div>

      <p className="text-xs font-medium text-white">{label}</p>

      <p className="text-[11px] text-zinc-500 mt-0.5">{hint}</p>

      {fileName ? (
        <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
          ✓ {fileName}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-zinc-500 bg-zinc-800/50 border border-zinc-700/30 px-2.5 py-0.5 rounded-full">
          Đang dùng ảnh hiện tại
        </span>
      )}
    </div>
  );
}
