"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Globe2,
  MessageSquareText,
  Tag,
  User,
  PlayCircle,
} from "lucide-react";

import Header from "@/components/layout/header";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useMovieDetail } from "@/hooks/use-movie-detail";
import ShowtimeSection from "@/components/movie/movie-detail/showTimeSection";
import CastSection from "@/components/movie/movie-detail/castSection";
import ReviewSection from "@/components/movie/movie-detail/reviewSection";
import RelatedMoviesSection from "@/components/movie/movie-detail/relateSection";
import Footer from "@/components/layout/footer";
export default function MovieDetailPage() {
  const params = useParams();

  const slug = params.slug as string;

  const { data: movie, isLoading } = useMovieDetail(slug);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b1633]">
        <Loader2 className="h-10 w-10 animate-spin text-yellow-400" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b1633] text-white">
        Không tìm thấy phim
      </div>
    );
  }

  const directors = movie.casts.filter((cast) => cast.roleType === "director");

  const actors = movie.casts.filter((cast) => cast.roleType === "actor");

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-r from-[#4e3aa5] to-[#081733] py-10">
        <div className="mx-auto grid max-w-[1100px] gap-9 px-4 lg:grid-cols-[320px_1fr]">
          {/* LEFT – poster */}
          <div>
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={320}
                height={480}
                className="h-[480px] w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5 text-white">
            {/* TITLE */}
            <h1 className="text-2xl font-black uppercase leading-tight tracking-wide">
              {movie.title}
            </h1>

            <hr className="border-white/10" />

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Thể loại
                </p>
                <p className="text-sm text-white/90">
                  {movie.genres.map((g) => g.name).join(", ")}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Thời lượng
                </p>
                <p className="text-sm text-white/90">
                  {movie.durationMinutes} phút
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Quốc gia
                </p>
                <p className="text-sm text-white/90">{movie.country}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Phụ đề
                </p>
                <p className="text-sm text-white/90">{movie.subtitle}</p>
              </div>
            </div>

            {/* AGE RATING */}
            <div className="rounded bg-yellow-300 px-3 py-2 text-xs font-medium leading-relaxed text-[#0b1633]">
              <span className="font-black">{movie.ageRating}:</span>{" "}
              {movie.description}
            </div>

            <hr className="border-white/10" />

            {/* MÔ TẢ */}
            <div>
              <h2 className="mb-3 text-xs font-black uppercase tracking-[3px] text-yellow-400">
                Mô Tả
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-white/85">
                <p>
                  <span className="font-bold text-white">Đạo diễn:</span>{" "}
                  {directors.map((d) => d.fullName).join(" – ")}
                </p>
                <p>
                  <span className="font-bold text-white">Diễn viên:</span>{" "}
                  {actors.map((a) => a.fullName).join(", ")}
                </p>
                <p>
                  <span className="font-bold text-white">Khởi chiếu:</span>{" "}
                  {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* NỘI DUNG */}
            <div>
              <h2 className="mb-3 text-xs font-black uppercase tracking-[3px] text-yellow-400">
                Nội Dung Phim
              </h2>
              <p className="line-clamp-5 text-sm leading-7 text-white/80">
                {movie.description}
              </p>
              <button className="mt-2 text-xs font-bold text-yellow-400 underline">
                Xem thêm
              </button>
            </div>

            <hr className="border-white/10" />

            {/* TRAILER */}
            <div>
              <Link href={movie.trailerUrl} target="_blank">
                <button className="flex items-center gap-3 rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-yellow-400/20">
                  <PlayCircle className="h-7 w-7 text-yellow-400" />
                  Xem Trailer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ── 4 SECTIONS BÊN DƯỚI ── */}
      <div className="bg-[#081733]">
        <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-10">
          {/* 1. Lịch chiếu */}
          <ShowtimeSection
            showtimes={movie.showTimes}
            status={movie.status}
            releaseDate={movie.releaseDate}
          />

          {/* 2. Diễn viên & Đạo diễn */}
          <CastSection casts={movie.casts} />

          {/* 3. Đánh giá */}
          <ReviewSection ratings={movie.ratings} reviews={movie.reviews} />

          {/* 4. Phim liên quan */}
          <RelatedMoviesSection relatedMovies={movie.relatedMovies} />
        </div>
      </div>

      <Footer />
    </>
  );
}
