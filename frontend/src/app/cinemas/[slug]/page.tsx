"use client";

import { useParams } from "next/navigation";

import CinemaHero from "@/components/cinema/cinema-hero";
// import CinemaTabs from "@/components/cinema/cinema-tabs";

import { useCinemaDetail } from "@/hooks/cinema/use-cinema-detail";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MovieCard from "@/components/cinema/movie-card";
import { useCinemaShowtimes } from "@/hooks/cinema/use-cinema-showtimes";
import { useMemo, useState } from "react";
import CinemaMovieNavbar from "./CinemaMovieNavbar";

type MovieTab =
  | "now_showing"
  | "coming_soon"
  | "special_showtime"
  | "ticket_price";

export default function CinemaDetailPage() {
  const params = useParams();

  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<MovieTab>("now_showing");

  const { data: cinema, isLoading } = useCinemaDetail(slug);
  const {
    data = [],
    isLoading: isShowtimesLoading,
    isFetching: isShowtimesFetching,
  } = useCinemaShowtimes(slug, activeTab !== "ticket_price");

  const movieCounts = useMemo(
    () => ({
      nowShowingCount: data.filter(
        (item) => item.movie.status === "now_showing",
      ).length,
      comingSoonCount: data.filter(
        (item) => item.movie.status === "coming_soon",
      ).length,
      specialShowtimeCount: 0,
    }),
    [data],
  );

  const filteredMovies = useMemo(() => {
    if (activeTab === "now_showing" || activeTab === "coming_soon") {
      return data.filter((item) => item.movie.status === activeTab);
    }
    if (activeTab === "special_showtime") {
      return data.filter((item) => item.movie.status === "special_showtime");
    }

    return [];
  }, [activeTab, data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071226] text-white">
        Loading...
      </div>
    );
  }

  if (!cinema) return null;

  return (
    <div className="min-h-screen bg-[#071226] text-white">
      <Header />
      <CinemaHero cinema={cinema} />
      <CinemaMovieNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={movieCounts}
      />

      <div className="mx-auto max-w-7xl px-4 mb-14 mt-12">
        <div className="flex justify-center mb-10">
          <h2 className="inline-block text-xl md:text-2xl font-black uppercase tracking-widest text-white border-b-2 border-yellow-400/20 pb-4">
            {activeTab === "now_showing"
              ? "PHIM ĐANG CHIẾU"
              : activeTab === "coming_soon"
                ? "PHIM SẮP CHIẾU"
                : activeTab === "special_showtime"
                  ? "SUẤT CHIẾU ĐẶC BIỆT"
                  : "BẢNG GIÁ VÉ"}
          </h2>
        </div>

        {activeTab === "ticket_price" ? (
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B172E] p-6 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#122345]">
                    <th className="p-4 font-bold text-yellow-400">
                      LOẠI VÉ (2D)
                    </th>
                    <th className="p-4 font-bold text-yellow-400">
                      THỨ 2 - THỨ 5
                    </th>
                    <th className="p-4 font-bold text-yellow-400">
                      THỨ 6 - CHỦ NHẬT & LỄ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">Ghế Đơn (Standard Seat)</td>
                    <td className="p-4">65.000 VNĐ</td>
                    <td className="p-4">85.000 VNĐ</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-yellow-500">
                      Ghế VIP (VIP Seat)
                    </td>
                    <td className="p-4">75.000 VNĐ</td>
                    <td className="p-4">95.000 VNĐ</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-pink-500">
                      Ghế Đôi (Sweetbox)
                    </td>
                    <td className="p-4">
                      150.000 VNĐ{" "}
                      <span className="text-xs text-gray-400">/ Cặp</span>
                    </td>
                    <td className="p-4">
                      180.000 VNĐ{" "}
                      <span className="text-xs text-gray-400">/ Cặp</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-400 italic text-center">
              * Giá vé trên chưa bao gồm phụ thu đối với các suất chiếu đặc
              biệt, phim bom tấn hoặc định dạng phòng chiếu cao cấp.
            </p>
          </div>
        ) : isShowtimesLoading || isShowtimesFetching ? (
          <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
            Đang tải lịch chiếu...
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            {filteredMovies.map((item) => (
              <MovieCard key={item.movie.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#0B172E] px-6 py-10 text-center text-gray-300">
            Không có phim phù hợp.
          </div>
        )}
      </div>

      {/* <section className="mx-auto max-w-7xl px-4 py-14 border-t border-white/10">
        <CinemaTabs cinema={cinema} />
      </section> */}

      <Footer />
    </div>
  );
}
