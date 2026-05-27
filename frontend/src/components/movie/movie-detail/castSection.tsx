"use client";

import Image from "next/image";
import { Users } from "lucide-react";

import { Cast } from "@/types/movie.type";

interface CastSectionProps {
  casts: Cast[];
}

function getInitials(name: string | undefined) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(-2)
    .join("")
    .toUpperCase();
}

// Màu avatar theo index
const AVATAR_COLORS = [
  "bg-purple-500/30 text-purple-300",
  "bg-blue-500/30 text-blue-300",
  "bg-teal-500/30 text-teal-300",
  "bg-pink-500/30 text-pink-300",
  "bg-orange-500/30 text-orange-300",
];

export default function CastSection({ casts }: CastSectionProps) {
  // Filter casts that have fullName (populated from person table)
  const validCasts = casts.filter((c) => c.fullName && c.fullName.trim());
  const directors = validCasts.filter((c) => c.roleType === "director");
  const actors = validCasts.filter((c) => c.roleType === "actor");

  // If no valid casts, show empty state
  if (validCasts.length === 0) {
    return null;
  }

  const CastCard = ({ cast, index }: { cast: Cast; index: number }) => (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-yellow-400/25 hover:bg-white/8">
      {/* Avatar */}
      <div className="relative">
        {cast.avatarUrl ? (
          <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/10">
            <Image
              src={cast.avatarUrl}
              alt={cast.fullName || "Cast member"}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-base font-bold ring-2 ring-white/10 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
          >
            {getInitials(cast.fullName)}
          </div>
        )}
        {/* Director badge trên avatar */}
        {cast.roleType === "director" && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-yellow-400 px-2 py-px text-[9px] font-black uppercase tracking-wide text-[#081733]">
            Đạo diễn
          </span>
        )}
      </div>

      {/* Tên */}
      <div className="mt-1 space-y-0.5">
        <p className="text-sm font-semibold leading-tight text-white">
          {cast.fullName || "Unknown"}
        </p>
        {cast.characterName && (
          <p className="text-xs italic text-yellow-300/80">
            {cast.characterName}
          </p>
        )}
        {cast.nationality && (
          <p className="text-xs text-white/40">{cast.nationality}</p>
        )}
      </div>
    </div>
  );

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
        <Users className="h-5 w-5 text-yellow-400" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          Diễn Viên &amp; Đạo Diễn
        </h2>
        <span className="ml-auto text-xs text-white/40">
          {validCasts.length} người
        </span>
      </div>

      {/* Đạo diễn */}
      {directors.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Đạo diễn
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {directors.map((cast, i) => (
              <CastCard key={cast.id} cast={cast} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Diễn viên */}
      {actors.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Diễn viên
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {actors.map((cast, i) => (
              <CastCard
                key={cast.id}
                cast={cast}
                index={directors.length + i}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
