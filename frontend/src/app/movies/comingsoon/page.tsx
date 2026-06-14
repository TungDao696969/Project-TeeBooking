"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MovieGridCard from "@/components/movies/movie-grid-card";
import { useMoviesList } from "@/hooks/use-movies-list";
import Link from "next/link";
import { useState } from "react";
import { Movie } from "@/types/home.type";

export default function ComingSoonMoviesPage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError } = useMoviesList({
    status: "coming_soon",
    page,
    limit,
  });

  const movies = data?.data || [];
  const pagination = data?.pagination || { totalPages: 1 };

  return (
    <div className="min-h-screen bg-[#071226] text-white">
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 py-10 mt-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 font-semibold mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-yellow-400 transition">
            Trang Chủ
          </Link>
          <span>&gt;</span>
          <span className="text-yellow-400">Phim Sắp Chiếu</span>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="inline-block text-3xl md:text-4xl font-black uppercase tracking-widest text-white border-b-4 border-yellow-400 pb-3 italic">
            Phim Sắp Chiếu
          </h1>
        </div>

        {/* Loading / Error States */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-400"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Không thể tải dữ liệu phim sắp chiếu.
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Hiện tại chưa có phim nào sắp chiếu.
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie: Movie) => (
                <MovieGridCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-md bg-[#0B172E] text-white hover:bg-yellow-400 hover:text-black font-semibold disabled:opacity-50 transition border border-white/10"
                >
                  Trước
                </button>
                <span className="text-sm font-semibold mx-2 text-gray-300">
                  Trang {page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-md bg-[#0B172E] text-white hover:bg-yellow-400 hover:text-black font-semibold disabled:opacity-50 transition border border-white/10"
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
