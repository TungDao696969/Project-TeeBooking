"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Clock, ShieldAlert, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import TrailerModal from "@/components/movies/trailer-modal";

interface Movie {
  id: string;
  title: string;
  slug: string;
  posterUrl: string;
  genres?: string[] | { id: string; name: string }[];
  trailerUrl?: string;
  durationMinutes?: number;
  ageRating?: string;
  status: "coming_soon" | "now_showing" | "ended" | string;
  language?: string;
  subtitle?: string;
  country?: string;
}

interface Props {
  movie: Movie;
}

export default function MovieGridCard({ movie }: Props) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const handleBooking = (slug: string) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push(`/movies/${slug}`);
  };

  const buttonLabel = movie.status === "coming_soon" ? "Xem" : "Đặt Vé";

  const renderGenres = () => {
    if (!movie.genres || movie.genres.length === 0) return "Chưa cập nhật";
    if (Array.isArray(movie.genres)) {
      return movie.genres
        .map((g) => (typeof g === "string" ? g : g.name))
        .join(", ");
    }
    return "Chưa cập nhật";
  };

  const renderLanguage = () => {
    if (!movie.language) return "VN";
    const lang = movie.language.toLowerCase();
    if (lang === "english" || lang === "tiếng anh") return "EN";
    if (lang === "vietnamese" || lang === "tiếng việt") return "VN";
    return movie.language;
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-[#0B172E] flex flex-col h-full border border-white/5 shadow-md">
        {/* Poster */}
        <div className="relative overflow-hidden rounded-t-2xl aspect-[2/3] w-full">
          <Link href={`/movies/${movie.slug}`} className="block w-full h-full">
            <Image
              src={getImageUrl(movie.posterUrl ?? "")}
              alt={movie.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
            />
          </Link>

          {/* Content Hover Overlay */}
          <div className="absolute inset-0 bg-black/80 flex flex-col justify-center px-6 text-white opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10">
            <h3 className="text-xl font-bold uppercase line-clamp-2">{movie.title}</h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="line-clamp-1">{renderGenres()}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>{movie.durationMinutes ? `${movie.durationMinutes} phút` : "Chưa cập nhật"}</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>{movie.ageRating || "K"}</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>{renderLanguage()}</span>
              </div>
            </div>

            <Button
              onClick={() => handleBooking(movie.slug)}
              className="mt-6 bg-yellow-400 text-black font-bold hover:bg-yellow-300 w-full"
            >
              {buttonLabel}
            </Button>
          </div>

          {/* Format & Age tags */}
          <div className="absolute left-2 top-2 flex gap-1.5 z-10">
            <span className="rounded bg-[#F5A623] px-2 py-0.5 text-xs font-bold text-black">
              2D
            </span>
            <span className="flex items-center rounded bg-[#E8192C] px-1.5 py-0.5 text-xs font-extrabold text-white">
              {movie.ageRating || "K"}
            </span>
          </div>
        </div>

        {/* Content always visible at bottom */}
        <div className="flex flex-col p-4 flex-1 justify-between bg-[#0B172E]">
          <h3 className="line-clamp-2 text-center text-sm md:text-base font-extrabold uppercase text-white min-h-[40px] md:min-h-[48px]">
            {movie.title}
          </h3>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
            {/* Trailer button */}
            <button
              onClick={() => setTrailerOpen(true)}
              className="flex shrink-0 items-center gap-1.5 text-white hover:text-yellow-400 transition"
            >
              <div className="rounded-full border border-white/30 p-1 bg-white/5">
                <Image
                  src={getImageUrl("https://cinestar.com.vn/assets/images/icon-play-vid.svg")}
                  alt="Play"
                  width={14}
                  height={14}
                />
              </div>
              <span className="text-xs font-bold">Xem Trailer</span>
            </button>

            {/* Book button */}
            <Button
              onClick={() => handleBooking(movie.slug)}
              className="bg-yellow-400 text-black font-bold hover:bg-yellow-300 text-xs px-3 py-1.5 h-auto"
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        movieId={movie.id}
        movieTitle={movie.title}
        fallbackUrl={movie.trailerUrl}
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </>
  );
}
