"use client";

import Image from "next/image";
import Link from "next/link";
import { Film, Star, Clock } from "lucide-react";

import { RelatedMovie } from "@/types/movie.type";

interface RelatedMoviesSectionProps {
  relatedMovies: RelatedMovie[];
}

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  now_showing: { label: "Đang chiếu", cls: "bg-green-500/20 text-green-400" },
  coming_soon: { label: "Sắp chiếu", cls: "bg-yellow-400/20 text-yellow-300" },
  ended: { label: "Đã kết thúc", cls: "bg-white/10 text-white/40" },
};

function MovieCard({ movie }: { movie: RelatedMovie }) {
  const status = STATUS_LABEL[movie.status] ?? STATUS_LABEL.ended;

  return (
    <Link
      href={`/movies/${movie.slug}`}
      className="group block flex-shrink-0 w-36 sm:w-40"
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10 transition group-hover:ring-yellow-400/40">
        <div className="aspect-[2/3] w-full">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        {/* Status badge */}
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.cls}`}
        >
          {status.label}
        </span>
        {/* Rating overlay */}
        {movie.ratings && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-4">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-white">
                {movie.ratings.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="line-clamp-2 text-xs font-semibold leading-tight text-white transition group-hover:text-yellow-300">
          {movie.title}
        </p>
        <div className="flex items-center gap-1 text-[11px] text-white/40">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <span>{movie.durationMinutes} phút</span>
        </div>
        {movie.genres.length > 0 && (
          <p className="truncate text-[11px] text-white/35">
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function RelatedMoviesSection({
  relatedMovies,
}: RelatedMoviesSectionProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
        <Film className="h-5 w-5 text-yellow-400" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          Phim Liên Quan
        </h2>
        {relatedMovies.length > 0 && (
          <span className="ml-auto text-xs text-white/40">
            {relatedMovies.length} phim
          </span>
        )}
      </div>

      {relatedMovies.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="flex items-end gap-1 opacity-20">
            {[48, 56, 44, 60, 40].map((h, i) => (
              <div
                key={i}
                className="w-7 rounded-sm bg-white"
                style={{ height: h }}
              />
            ))}
          </div>
          <p className="text-sm text-white/50">Chưa có phim liên quan</p>
          <p className="text-xs text-white/30">
            Các phim cùng thể loại sẽ hiển thị tại đây
          </p>
        </div>
      ) : (
        /* Poster grid scroll ngang */
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {relatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
