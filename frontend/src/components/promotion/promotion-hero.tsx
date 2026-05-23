"use client";

import Image from "next/image";

import { getImageUrl } from "@/lib/image";
import { Promotion } from "@/types/promotion.type";

interface Props {
  promotion: Promotion;
}

export default function PromotionHero({ promotion }: Props) {
  return (
    <div className="relative h-[420px] overflow-hidden">
      <Image
        src={getImageUrl(promotion.imageUrl)}
        alt={promotion.title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              KHUYẾN MÃI HOT
            </div>

            <h1 className="text-4xl font-extrabold uppercase text-white lg:text-6xl">
              {promotion.title}
            </h1>

            {promotion.description && (
              <p className="mt-5 text-lg text-gray-200">
                {promotion.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
