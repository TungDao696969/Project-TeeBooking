"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Promotion } from "@/types/home.type";
import { getImageUrl } from "@/lib/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface Props {
  promotions: Promotion[];
}

export default function PromotionSection({ promotions }: Props) {
  const ITEMS_PER_PAGE = 3;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Total pages
  const totalPages = Math.ceil(promotions.length / ITEMS_PER_PAGE);

  // Promotions hiện tại
  const visiblePromotions = promotions.slice(
    currentIndex * ITEMS_PER_PAGE,
    currentIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

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
          Khuyến Mãi
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visiblePromotions.map((promo) => (
            <div key={promo.id} className="group overflow-hidden rounded-2xl">
              {/* Image */}
              <Link
                href={`/promotions/${promo.id}`}
                className="relative block overflow-hidden rounded-2xl"
              >
                <Image
                  src={getImageUrl(promo.imageUrl ?? "")}
                  alt={promo.title}
                  width={600}
                  height={350}
                  className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
              </Link>

              {/* Content */}
              <div className="mt-4">
                <Link
                  href={`/promotions/${promo.id}`}
                  className="line-clamp-2 text-lg font-extrabold uppercase text-white transition hover:text-yellow-400"
                >
                  {promo.title}
                </Link>

                {promo.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-white/70">
                    {promo.description}
                  </p>
                )}
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

      {/* View More */}
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
