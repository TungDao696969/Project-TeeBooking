"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MovieHero from "@/components/movie/movie-hero";
import MovieTabs from "@/components/movie/movie-tabs";

import { useMovieDetail } from "@/hooks/use-movie-detail";
import { useParams } from "next/navigation";
import ShowtimesSection from "@/components/movie/movie-detail/showtimes-section";
export default function MovieDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading } = useMovieDetail(slug);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b1633] text-white">
        Loading...
      </div>
    );
  }

  const movie = data?.data.movie;

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-[#0b1633] text-white">
      <Header />
      <MovieHero
        movie={movie}
        genres={data.data.genres}
        ratings={data.data.ratings}
        casts={data.data.casts}
      />

      <div className="container mx-auto px-4 py-10">
        <MovieTabs
          casts={data.data.casts}
          reviews={data.data.reviews}
          description={movie.description}
        />
      </div>

      <div>
        <ShowtimesSection key={movie.slug} movieSlug={movie.slug} />
      </div>
      <Footer />
    </div>
  );
}
