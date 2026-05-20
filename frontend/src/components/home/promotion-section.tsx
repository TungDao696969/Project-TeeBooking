"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Promotion } from "@/types/home.type";
import { getImageUrl } from "@/lib/image";
import { Button } from "@/components/ui/button";

export default function PromotionSection({
  promotions,
}: {
  promotions: Promotion[];
}) {
  const [current, setCurrent] = useState(0);

  // Mỗi trang hiện 3 ảnh
  const itemsPerPage = 3;
  const totalPages = Math.ceil(promotions.length / itemsPerPage);

  const prev = () => setCurrent((p) => Math.max(p - 1, 0));
  const next = () => setCurrent((p) => Math.min(p + 1, totalPages - 1));

  const visible = promotions.slice(
    current * itemsPerPage,
    current * itemsPerPage + itemsPerPage,
  );

  return (
    <section className="py-10">
      {/* Title */}
      <h2 className="mb-8 text-2xl font-extrabold uppercase italic text-white md:text-4xl">
        Khuyến Mãi
      </h2>

      {/* Slider */}
      <div className="relative flex items-center gap-3">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Cards */}
        <div className="grid flex-1 grid-cols-3 gap-4">
          {visible.map((promo) => (
            <div
              key={promo.id}
              className="overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={encodeURI(getImageUrl(promo.imageUrl ?? ""))}
                alt={promo.title}
                className="aspect-video w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === totalPages - 1}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                i === current ? "bg-white scale-110" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* CTA Button */}
      <div className="mt-6 flex justify-center">
        <Button className="rounded-md bg-yellow-400 px-16 py-5 text-base font-extrabold uppercase tracking-widest text-black hover:bg-yellow-300">
          Tất Cả Ưu Đãi
        </Button>
      </div>
    </section>
  );
}
