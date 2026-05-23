"use client";

import Header from "@/components/layout/header";
import HeroBanner from "@/components/home/hero-banner";
import MovieSection from "@/components/home/movie-section";
import CinemaSection from "@/components/home/cinema-section";
import PromotionSection from "@/components/home/promotion-section";
import BlogSection from "@/components/home/blog-section";
import { useHome } from "@/hooks/use-home";
import QuickBooking from "@/components/home/quick-booking";
import ContactSection from "@/components/home/contact";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  const { data, isLoading, error } = useHome();

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
          Loading...
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen text-red-500 text-lg font-medium">
          Không thể tải dữ liệu trang chủ.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <QuickBooking />

        <MovieSection title="Phim đang chiếu" movies={data.nowShowing || []} />

        <MovieSection title="Phim sắp chiếu" movies={data.comingSoon || []} />
      </main>
      <Footer />
    </>
  );
}
