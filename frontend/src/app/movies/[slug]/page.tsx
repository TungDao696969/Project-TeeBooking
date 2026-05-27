"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

import Header from "@/components/layout/header";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useMovieDetail } from "@/hooks/use-movie-detail";
import ShowtimeSection from "@/components/movie/movie-detail/showTimeSection";
import CastSection from "@/components/movie/movie-detail/castSection";
import ReviewSection from "@/components/movie/movie-detail/reviewSection";
import RelatedMoviesSection from "@/components/movie/movie-detail/relateSection";
import Footer from "@/components/layout/footer";
import { RelatedMovie } from "@/types/movie.type";
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

  const relatedMovies: RelatedMovie[] = (movie.relatedMovies || []).map(
    (m) => ({
      id: m.id,
      title: m.title,
      slug: m.slug,
      posterUrl: m.posterUrl,
      durationMinutes: m.durationMinutes,
      genres: m.genres || [],
      ratings: m.ratings,
      status:
        (m.status as "now_showing" | "coming_soon" | "ended") || "coming_soon",
    }),
  );

  return (
    <>
      <Header />
      {/* Hero Banner Section */}
      <section className="relative min-h-[500px] w-full overflow-hidden bg-gradient-to-r from-[#4e3aa5] via-[#2a2554] to-[#081733]">
        {/* Background image blur */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${movie.bannerUrl || movie.posterUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(30px)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081733] via-[#081733]/80 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto grid max-w-[1100px] gap-9 px-4 py-10 lg:grid-cols-[300px_1fr]">
          {/* LEFT – Poster */}
          <div className="flex justify-center lg:justify-start">
            <div className="overflow-hidden rounded-xl shadow-2xl ring-2 ring-yellow-400/20">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={300}
                height={450}
                className="h-[450px] w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT – Movie Info */}
          <div className="flex flex-col justify-center gap-6 text-white">
            {/* Title */}
            <div>
              <p className="text-sm uppercase tracking-wider text-yellow-400 opacity-80">
                {movie.status === "now_showing"
                  ? "Đang Chiếu"
                  : movie.status === "coming_soon"
                    ? "Sắp Chiếu"
                    : "Đã Kết Thúc"}
              </p>
              <h1 className="mt-2 text-4xl font-black uppercase leading-tight tracking-wide">
                {movie.title}
              </h1>
              <p className="mt-2 text-sm text-white/70">
                {movie.originalTitle}
              </p>
            </div>

            {/* Rating & Info Bar */}
            <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 font-bold text-[#081733]">
                  {movie.ratings?.averageRating || "N/A"}
                </span>
                <span className="text-sm text-white/70">
                  ({movie.ratings?.totalReviews || 0} đánh giá)
                </span>
              </div>
              <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-sm font-semibold text-yellow-300">
                {movie.ageRating}
              </span>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-3">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Thể Loại
                </p>
                <p className="text-sm text-white/90">
                  {movie.genres.map((g) => g.name).join(", ")}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Thời Lượng
                </p>
                <p className="text-sm text-white/90">
                  {movie.durationMinutes} phút
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Quốc Gia
                </p>
                <p className="text-sm text-white/90">{movie.country}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Ngôn Ngữ
                </p>
                <p className="text-sm text-white/90">{movie.language}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Phụ Đề
                </p>
                <p className="text-sm text-white/90">{movie.subtitle}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
                  Nhà Sản Xuất
                </p>
                <p className="text-sm text-white/90">{movie.producer}</p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-white/10 pt-4">
              <p className="line-clamp-4 text-sm leading-relaxed text-white/85">
                {movie.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href={movie.trailerUrl} target="_blank">
                <button className="flex items-center gap-2 rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-6 py-3 font-semibold text-white transition hover:bg-yellow-400/20">
                  <PlayCircle className="h-5 w-5 text-yellow-400" />
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
            showtimes={movie.showtimes}
            status={movie.status}
            releaseDate={movie.releaseDate}
          />

          {/* 2. Diễn viên & Đạo diễn */}
          <CastSection casts={movie.casts} />

          {/* 3. Đánh giá */}
          <ReviewSection ratings={movie.ratings} reviews={movie.reviews} />

          {/* 4. Phim liên quan */}
          <RelatedMoviesSection relatedMovies={relatedMovies} />
        </div>
      </div>

      <Footer />
    </>
  );
}
