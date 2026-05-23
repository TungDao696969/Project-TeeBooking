"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Movie } from "@/types/home.type";
import { getImageUrl } from "@/lib/image";

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieSection({ title, movies }: Props) {
  const ITEMS_PER_PAGE = 5;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Total pages
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  // Movies hiện tại
  const visibleMovies = movies.slice(
    currentIndex * ITEMS_PER_PAGE,
    currentIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  // Button text
  const buttonLabel = (movie: Movie) => {
    if (movie.status === "coming_soon") {
      return "Tìm Hiểu Ngay";
    }

    if (!movie.status && title.toLowerCase().includes("sắp chiếu")) {
      return "Tìm Hiểu Ngay";
    }

    return "Đặt Vé";
  };

  // Next
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Prev
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <section className="py-12">
      {/* Title */}
      <div className="mb-10 flex items-center justify-center">
        <h2 className="text-center text-3xl font-extrabold uppercase italic text-white md:text-4xl">
          {title}
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleMovies.map((movie) => (
            <div key={movie.id} className="overflow-hidden rounded-2xl">
              {/* Poster */}
              <div className="relative">
                <Link
                  href={`/movies/${movie.slug}`}
                  className="relative block overflow-hidden rounded-2xl"
                >
                  <Image
                    src={getImageUrl(movie.posterUrl ?? "")}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="aspect-[2/3] w-full object-cover"
                  />
                </Link>

                {/* Tags */}
                <div className="absolute left-2 top-2 flex gap-1.5">
                  <span className="rounded bg-[#F5A623] px-2 py-0.5 text-xs font-bold text-black">
                    2D
                  </span>

                  <span className="flex items-center rounded bg-[#E8192C] px-1.5 py-0.5 text-xs font-extrabold leading-none text-white">
                    K
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col px-3 py-3">
                <h3 className="line-clamp-2 min-h-[56px] text-center text-base font-extrabold uppercase text-white md:text-lg">
                  {movie.title}
                </h3>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  {/* Trailer */}
                  <Link
                    href={movie.trailerUrl || "#"}
                    className="flex shrink-0 items-center gap-1.5 text-white"
                  >
                    <div className="rounded-full border">
                      <Image
                        src={getImageUrl(
                          "https://cinestar.com.vn/assets/images/icon-play-vid.svg",
                        )}
                        alt={movie.title}
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>

                    <span className="hidden text-xs font-semibold md:inline md:text-sm">
                      Xem Trailer
                    </span>
                  </Link>

                  {/* Button */}
                  <Button className="ml-auto h-10 min-w-0 shrink rounded-md bg-yellow-400 px-2 text-xs font-extrabold uppercase text-black hover:bg-yellow-300 md:px-4 md:text-sm">
                    <span className="break-words text-center leading-tight">
                      {buttonLabel(movie)}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 text-white transition hover:scale-110"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 text-white transition hover:scale-110"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition ${
              currentIndex === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <div className="mt-6 flex items-center justify-center">
        <Button
          variant="outline"
          className="rounded-md border-2 border-yellow-400 bg-transparent px-16 py-5 text-base font-extrabold uppercase tracking-widest text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
        >
          Xem Thêm
        </Button>
      </div>
    </section>
  );
}
