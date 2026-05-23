"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie.type";
import { CalendarDays, Clock3, Globe2, Play, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
interface Props {
  movie: Movie;
}
export default function MovieDetailHero({ movie }: Props) {
  return (
    <div className="relative h-[650px] overflow-hidden">
      {/* Banner */}
      <Image
        src={movie.bannerUrl}
        alt={movie.title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] via-black/30 to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-center gap-10 px-4">
        {/* Poster */}
        <div className="hidden lg:block">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            width={320}
            height={480}
            className="rounded-2xl shadow-2xl"
          />
        </div>

        {/* Info */}
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded bg-yellow-400 px-3 py-1 text-sm font-black text-black">
              {movie.ageRating}
            </span>

            <span className="rounded bg-red-500 px-3 py-1 text-sm font-bold uppercase">
              {movie.status === "now_showing" ? "Đang Chiếu" : "Sắp Chiếu"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black uppercase leading-tight md:text-6xl">
            {movie.title}
          </h1>

          <p className="mt-3 text-xl italic text-white/70">
            {movie.originalTitle}
          </p>

          {/* Meta */}
          <div className="mt-7 flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-yellow-400" />
              {movie.durationMinutes} phút
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-yellow-400" />
              {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
            </div>

            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-yellow-400" />
              {movie.country}
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              {movie.ratings.averageRating}/5
            </div>
          </div>

          {/* Genres */}
          <div className="mt-7 flex flex-wrap gap-3">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-400"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button className="h-14 rounded-xl bg-yellow-400 px-10 text-lg font-black text-black hover:bg-yellow-300">
              Đặt Vé Ngay
            </Button>

            <Link href={movie.trailerUrl}>
              <Button
                variant="outline"
                className="h-14 rounded-xl border-white bg-transparent px-10 text-lg text-white hover:bg-white hover:text-black"
              >
                <Play className="mr-2 h-5 w-5 fill-white" />
                Xem Trailer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
