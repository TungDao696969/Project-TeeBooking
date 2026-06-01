"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Calendar,
  Languages,
  Globe,
  Shield,
  Clapperboard,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie.type";

interface Props {
  data: Movie;
}

export default function MovieDetail({ data: movie }: Props) {
  return (
    <div className="space-y-6">
      {/* ── Banner ── */}
      <div className="relative h-72 overflow-hidden rounded-2xl border border-yellow-500/20">
        {movie.bannerUrl ? (
          <>
            <Image
              src={movie.bannerUrl}
              alt={movie.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-[#12121a] flex items-center justify-center text-zinc-600 text-sm">
            Chưa có banner
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-7 py-5 flex items-end justify-between gap-4">
          <div>
            <MovieStatusBadge status={movie.status} />
            <h1 className="mt-2 text-2xl font-bold text-white leading-tight tracking-tight">
              {movie.title}
            </h1>
            {movie.originalTitle && (
              <p className="mt-1 text-xs text-white/50">
                {movie.originalTitle}
              </p>
            )}
          </div>
          <Link
            href={`/admin/movie/${movie.id}/edit`}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg border border-yellow-400/35 bg-yellow-400/8 text-yellow-400 hover:bg-yellow-400/15 transition-colors"
          >
            <Pencil size={12} /> Chỉnh sửa
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Poster */}
        <div className="rounded-2xl overflow-hidden border border-yellow-500/20 aspect-[2/3] bg-[#1a1a26]">
          {movie.posterUrl ? (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">
              Chưa có poster
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Genres */}
          <div className="flex flex-wrap gap-1.5">
            {movie.genres?.length > 0 ? (
              movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-red-600/10 text-red-400 border border-red-600/25"
                >
                  {g.name}
                </span>
              ))
            ) : (
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#0e0e16] text-zinc-500 border border-yellow-500/15">
                Chưa có thể loại
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <SectionLabel>Mô tả</SectionLabel>
            <p className="text-sm leading-relaxed text-zinc-400">
              {movie.description}
            </p>
          </div>

          {/* Info grid */}
          <div>
            <SectionLabel>Thông tin</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              <InfoCard
                icon={<Clock3 size={15} />}
                label="Thời lượng"
                value={`${movie.durationMinutes} phút`}
              />
              <InfoCard
                icon={<Calendar size={15} />}
                label="Ngày chiếu"
                value={new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
              />
              <InfoCard
                icon={<Languages size={15} />}
                label="Ngôn ngữ"
                value={movie.language}
              />
              <InfoCard
                icon={<Globe size={15} />}
                label="Quốc gia"
                value={movie.country}
              />
              <InfoCard
                icon={<Shield size={15} />}
                label="Giới hạn tuổi"
                value={movie.ageRating}
              />
              <InfoCard
                icon={<Clapperboard size={15} />}
                label="Nhà sản xuất"
                value={movie.producer}
              />
            </div>
          </div>

          {/* Extra */}
          <div>
            <SectionLabel>Chi tiết thêm</SectionLabel>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-[#0e0e16] border border-yellow-500/18 rounded-xl px-5 py-4">
              <ExtraItem label="Phụ đề" value={movie.subtitle} />
              <ExtraItem label="Trạng thái">
                <MovieStatusBadge status={movie.status} small />
              </ExtraItem>
              <div className="col-span-2">
                <ExtraItem label="Slug">
                  <code className="text-yellow-400 font-mono text-xs">
                    {movie.slug}
                  </code>
                </ExtraItem>
              </div>
              {movie.endDate && (
                <ExtraItem
                  label="Ngày kết thúc"
                  value={new Date(movie.endDate).toLocaleDateString("vi-VN")}
                />
              )}
            </div>
          </div>

          {/* Trailer */}
          {movie.trailerUrl && (
            <div>
              <SectionLabel>Trailer</SectionLabel>
              <div className="rounded-xl overflow-hidden border border-yellow-500/20 bg-black">
                <iframe
                  width="100%"
                  height="360"
                  src={movie.trailerUrl.replace("watch?v=", "embed/")}
                  allowFullScreen
                  className="block"
                />
              </div>
            </div>
          )}
            
          <Button variant="outline" asChild>
            <Link href="/admin/movie">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-red-500 mb-3">
      {children}
      <span className="flex-1 h-px bg-yellow-500/15" />
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 bg-[#0e0e16] border border-yellow-500/18 rounded-xl px-3.5 py-3">
      <span className="mt-0.5 text-yellow-400 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] text-zinc-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function ExtraItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] text-zinc-500 mb-1">{label}</p>
      {children ?? <p className="text-sm font-medium text-white">{value}</p>}
    </div>
  );
}

// ── Status badge ─────────────────────────────────────

export function MovieStatusBadge({
  status,
  small,
}: {
  status: string;
  small?: boolean;
}) {
  const map: Record<string, { label: string; cls: string }> = {
    now_showing: {
      label: "Đang chiếu",
      cls: "bg-red-600/15 text-red-400 border-red-600/30",
    },
    coming_soon: {
      label: "Sắp chiếu",
      cls: "bg-yellow-400/12 text-yellow-400 border-yellow-400/30",
    },
    ended: {
      label: "Đã kết thúc",
      cls: "bg-zinc-700/40 text-zinc-400 border-zinc-600/30",
    },
  };
  const { label, cls } = map[status] ?? {
    label: status,
    cls: "bg-zinc-700/40 text-zinc-400 border-zinc-600/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full
        ${small ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-1"} ${cls}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
