"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Clock3, Globe2, Mic2, Ticket, Users2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image";
import { Cast, Genre, Movie, Ratings } from "@/types/movie.type";

interface Props {
  movie: Movie;
  genres: Genre[];
  ratings: Ratings;
  casts: Cast[];
}

function formatDateVi(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export default function MovieHero({ movie, genres, casts }: Props) {
  const [expanded, setExpanded] = useState(false);

  const meta = useMemo(() => {
    const directors = casts
      .filter((c) => c.roleType === "director")
      .map((c) => c.fullName)
      .filter(Boolean) as string[];

    const actors = casts
      .filter((c) => c.roleType === "actor")
      .map((c) => c.fullName)
      .filter(Boolean) as string[];

    return {
      directors,
      actors,
    };
  }, [casts]);

  const genreText = genres
    .map((g) => g.name)
    .filter(Boolean)
    .join(", ");
  const releaseText = formatDateVi(movie.releaseDate);

  return (
    <section className="relative overflow-hidden">
      {/* background like screenshot */}
      <div className="pointer-events-none absolute inset-0 bg-[#0b1633]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(120,70,255,0.35),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />

      <div className="relative container mx-auto px-4 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
          {/* Poster */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={getImageUrl(movie.posterUrl)}
                alt={movie.title}
                width={420}
                height={630}
                priority
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-wide md:text-4xl lg:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-6 space-y-3 text-sm text-white/90 md:text-base">
              <div className="flex items-center gap-3">
                <Users2 className="h-5 w-5 text-yellow-400" />
                <span>{genreText || "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-yellow-400" />
                <span>{movie.durationMinutes}&#39;</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-yellow-400" />
                <span>{movie.country || "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mic2 className="h-5 w-5 text-yellow-400" />
                <span>{movie.subtitle || "—"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded bg-yellow-400 px-3 py-1 text-sm font-extrabold text-black">
                  {movie.ageRating}
                </span>
              </div>
            </div>

            {/* Mô tả */}
            <div className="mt-8">
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                Mô tả
              </h2>

              <div className="mt-3 space-y-1.5 text-sm leading-7 text-white/90 md:text-base">
                <p>
                  Đạo diễn:{" "}
                  <span className="font-semibold">
                    {meta.directors.length ? meta.directors.join(", ") : "—"}
                  </span>
                </p>

                <p>
                  Diễn viên:{" "}
                  <span className="font-semibold">
                    {meta.actors.length ? meta.actors.join(", ") : "—"}
                  </span>
                </p>

                <p>
                  Khởi chiếu:{" "}
                  <span className="font-semibold">{releaseText || "—"}</span>
                </p>
              </div>
            </div>

            {/* Nội dung */}
            <div className="mt-8">
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                Nội dung phim
              </h2>

              <p
                className={[
                  "mt-3 text-sm leading-7 text-white/85 md:text-base",
                  expanded ? "" : "line-clamp-6",
                ].join(" ")}
              >
                {movie.description}
              </p>

              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 text-sm font-semibold text-blue-200 hover:text-blue-100"
              >
                {expanded ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>

            {/* Actions like screenshot */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={movie.trailerUrl || "#"}
                className="flex items-center gap-2 text-white hover:text-yellow-200"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60">
                  <Image
                    src={getImageUrl(
                      "https://cinestar.com.vn/assets/images/icon-play-vid.svg",
                    )}
                    alt="play"
                    width={18}
                    height={18}
                  />
                </span>
                <span className="text-sm font-semibold">Xem Trailer</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
