"use client";

import { useSearchParams, useRouter } from "next/navigation";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { useSearchMovies } from "@/hooks/use-search-movies";
import { Movie } from "@/types/movie.type";
import { getImageUrl } from "@/lib/image";
import Link from "next/link";
// const GENRES = [
//   { value: "", label: "Tất cả thể loại" },
//   { value: "action", label: "Hành động" },
//   { value: "horror", label: "Kinh dị" },
//   { value: "romance", label: "Tình cảm" },
//   { value: "comedy", label: "Hài hước" },
//   { value: "animation", label: "Hoạt hình" },
// ];

// const SORTS = [
//   { value: "latest", label: "Mới nhất" },
//   { value: "oldest", label: "Cũ nhất" },
//   { value: "rating_desc", label: "Đánh giá cao nhất" },
//   { value: "rating_asc", label: "Đánh giá thấp nhất" },
// ];

export default function MoviesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "latest";
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading } = useSearchMovies({
    q,
    genre,
    sort,
    page,
    limit: 10,
  });

  console.log("SEARCH PARAMS:", { q, genre, sort, page });
  console.log("MOVIES RESPONSE:", data);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") {
      params.set("page", "1");
    }
    router.push(`/movies?${params.toString()}`);
  };

  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0b1633]">
        {/* Hero banner */}
        <div className="relative bg-gradient-to-b bg-[#0b1633]">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]" />
          <div className="mx-auto max-w-[1320px] px-4 relative">
            <div className="flex items-center gap-3 mb-2 mt-3">
              <div className="h-8 w-1 bg-[#e50000] rounded-full" />
              <h1 className="text-4xl font-black text-white tracking-tight">
                Danh Sách Phim
              </h1>
            </div>

            <p className="text-gray-500 mt-2 text-sm">
              Khám phá hàng trăm bộ phim đang chiếu tại hệ thống rạp Cinestar
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-4 py-8 space-y-8">
          {/* Results count */}
          {!isLoading && data?.data && (
            <p className="text-gray-500 text-sm">
              Tìm thấy{" "}
              <span className="text-white font-semibold">
                {data?.pagination?.totalItems ?? data.data.length}
              </span>{" "}
              bộ phim
              {q && (
                <>
                  {" "}
                  cho từ khoá{" "}
                  <span className="text-[#e50000] font-semibold">{q}</span>
                </>
              )}
            </p>
          )}

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[#1a1a1a] rounded-xl h-72 w-full mb-3" />
                  <div className="bg-[#1a1a1a] rounded h-4 w-3/4 mb-2" />
                  <div className="bg-[#1a1a1a] rounded h-3 w-1/3" />
                </div>
              ))}
            </div>
          )}

          {/* Movie grid */}
          {!isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data?.data?.map((movie: Movie) => (
                <div
                  key={movie.id}
                  className="group relative cursor-pointer"
                  onClick={() => router.push(`/movies/${movie.slug}`)}
                >
                  {/* Poster */}
                  <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-[#161616]">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                    flex flex-col justify-end p-4"
                    >
                      <button
                        className="w-full bg-white/10 hover:bg-white/20 text-white text-sm
                                   py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                      >
                        Xem chi tiết
                      </button>
                    </div>

                    {/* Rating badge */}
                    {/* <div
                      className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm
                                    border border-yellow-500/40 rounded-md px-2 py-1
                                    flex items-center gap-1"
                    >
                      <svg
                        className="w-3 h-3 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-yellow-400 text-xs font-bold">
                        {Number(movie.).toFixed(1)}
                      </span>
                    </div> */}
                  </div>

                  {/* Info */}
                  <div className="mt-3 px-0.5">
                    <h2 className="text-white text-2xl font-bold leading-tight line-clamp-2 transition-colors duration-200 mb-2">
                      {movie.title}
                    </h2>
                    <div className="flex gap-5 items-center justify-center">
                      <Link
                        href={movie.trailerUrl || "#"}
                        className="flex shrink-0 items-center gap-1.5 text-white"
                      >
                        <div className="rounded-full border">
                          <img
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
                      <button
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold
                                   py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                      >
                        Đặt vé
                      </button>
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                      <p className="text-gray-500 text-sm mt-1 capitalize">
                        {" "}
                        {movie.genres.map((g) => g.name).join(", ")}{" "}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && data?.data?.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-white font-bold text-xl mb-2">
                Không tìm thấy phim
              </h3>
              <p className="text-gray-500 text-sm">
                Thử tìm kiếm với từ khoá khác
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={page <= 1}
                onClick={() => updateQuery("page", String(page - 1))}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                           bg-[#161616] border border-[#2a2a2a] text-gray-400
                           hover:border-[#e50000] hover:text-white
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2a2a2a] disabled:hover:text-gray-400
                           transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Trước
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => updateQuery("page", String(pageNum))}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors duration-200 ${
                        pageNum === page
                          ? "bg-[#e50000] text-white border border-[#e50000]"
                          : "bg-[#161616] border border-[#2a2a2a] text-gray-400 hover:border-[#e50000] hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={page >= totalPages}
                onClick={() => updateQuery("page", String(page + 1))}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                           bg-[#161616] border border-[#2a2a2a] text-gray-400
                           hover:border-[#e50000] hover:text-white
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2a2a2a] disabled:hover:text-gray-400
                           transition-colors duration-200"
              >
                Sau
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
