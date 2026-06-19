"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Movie } from "@/types/home.type";
import { getImageUrl } from "@/lib/image";
import { Tag, Clock, ShieldAlert, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import TrailerModal from "@/components/movies/trailer-modal";
interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieSection({ title, movies }: Props) {
  const ITEMS_PER_PAGE = 4;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);

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
      return "Xem";
    }

    if (!movie.status && title.toLowerCase().includes("sắp chiếu")) {
      return "Xem";
    }

    return "Đặt Vé";
  };

  const renderGenres = (movie: Movie) => {
    if (!movie.genres || movie.genres.length === 0) return "Chưa cập nhật";
    if (Array.isArray(movie.genres)) {
      return movie.genres
        .map((g) => (typeof g === "string" ? g : g.name))
        .join(", ");
    }
    return "Chưa cập nhật";
  };

  const renderLanguage = (movie: Movie) => {
    if (!movie.language) return "VN";
    const lang = movie.language.toLowerCase();
    if (lang === "english" || lang === "tiếng anh") return "EN";
    if (lang === "vietnamese" || lang === "tiếng việt") return "VN";
    return movie.language;
  };

  // Next
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Prev
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("isAuthenticated =", isAuthenticated);
  const handleBooking = (slug: string) => {
    console.log("clicked");
    console.log("isAuthenticated =", isAuthenticated);

    if (!isAuthenticated) {
      console.log("redirect login");
      router.push("/login");
      return;
    }

    router.push(`/movies/${slug}`);
  };

  const handleViewMore = () => {
    if (title.toLowerCase().includes("đang chiếu")) {
      router.push("/movies/showing");
    } else {
      router.push("/movies/comingsoon");
    }
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
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {visibleMovies.map((movie) => (
            <div
              key={movie.id}
              className="
    group
    relative
    overflow-hidden
    
  "
            >
              {/* Poster */}
              <div className="relative overflow-hidden ">
                <Link href={`/movies/${movie.slug}`} className="block">
                  <Image
                    src={getImageUrl(movie.posterUrl ?? "")}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="
        aspect-[2/3]
        w-full
        object-cover
        transition-all
        duration-500
        group-hover:scale-110
      "
                  />
                </Link>

                {/* Content Hover Overlay */}
                <div
                  className="
      absolute inset-0
      bg-black/80
      flex flex-col
      justify-center
      px-6
      text-white

      opacity-0
      translate-y-6

      transition-all
      duration-500

      group-hover:opacity-100
      group-hover:translate-y-0
      z-10
    "
                >
                  <h3 className="text-2xl font-bold uppercase">
                    {movie.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {renderGenres(movie)}
                      </span>
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
                      <span>{renderLanguage(movie)}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBooking(movie.slug)}
                    className="
                    mt-3
    bg-yellow-400
    text-black
    font-bold
    hover:bg-yellow-300
  "
                  >
                    {buttonLabel(movie)}
                  </Button>
                </div>

                {/* Tags */}
                <div className="absolute left-2 top-2 flex gap-1.5">
                  <span className="rounded bg-[#F5A623] px-2 py-0.5 text-xs font-bold text-black">
                    2D
                  </span>

                  <span className="flex items-center rounded bg-[#E8192C] px-1.5 py-0.5 text-xs font-extrabold text-white">
                    {movie.ageRating || "K"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col px-3 py-3">
                <h3 className="line-clamp-2 min-h-[56px] text-center text-base font-extrabold uppercase text-white md:text-lg">
                  {movie.title}
                </h3>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  {/* Trailer button */}
                  <button
                    onClick={() => setTrailerMovie(movie)}
                    className="flex shrink-0 items-center gap-1.5 text-white hover:text-yellow-400 transition"
                  >
                    <div className="rounded-full border border-white/30 p-0.5 bg-white/5">
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
                  </button>

                  {/* Button */}
                  <Button
                    onClick={() => handleBooking(movie.slug)}
                    className="
    bg-yellow-400
    text-black
    font-bold
    hover:bg-yellow-300
  "
                  >
                    {buttonLabel(movie)}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 lg:-left-12 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:scale-110 lg:bg-transparent lg:p-0 opacity-0 group-hover:opacity-100 md:opacity-100 hidden md:block"
        >
          <ChevronLeft className="h-6 w-6 lg:h-10 lg:w-10" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 lg:-right-12 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:scale-110 lg:bg-transparent lg:p-0 opacity-0 group-hover:opacity-100 md:opacity-100 hidden md:block"
        >
          <ChevronRight className="h-6 w-6 lg:h-10 lg:w-10" />
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
          onClick={handleViewMore}
          variant="outline"
          className="rounded-md border-2 border-yellow-400 bg-transparent px-16 py-5 text-base font-extrabold uppercase tracking-widest text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
        >
          Xem Thêm
        </Button>
      </div>

      {/* Trailer Modal */}
      {trailerMovie && (
        <TrailerModal
          movieId={trailerMovie.id}
          movieTitle={trailerMovie.title}
          fallbackUrl={trailerMovie.trailerUrl}
          isOpen={!!trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}
    </section>
  );
}
