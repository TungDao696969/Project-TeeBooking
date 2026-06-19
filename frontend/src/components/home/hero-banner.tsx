"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Banner } from "@/types/home.type";

interface Props {
  banners: Banner[];
}

export default function HeroBanner({ banners }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentBanner = banners?.[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (!currentBanner) {
    return null;
  }
  return (
    <div className="relative w-full group">
      {/* Banner */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={encodeURI((currentBanner.imageUrl ?? "").trim())}
              alt={currentBanner.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-2 lg:-left-12 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:scale-110 lg:bg-transparent lg:p-0 opacity-0 group-hover:opacity-100 lg:opacity-100"
      >
        <ChevronLeft className="h-6 w-6 lg:h-10 lg:w-10" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-2 lg:-right-12 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:scale-110 lg:bg-transparent lg:p-0 opacity-0 group-hover:opacity-100 lg:opacity-100"
      >
        <ChevronRight className="h-6 w-6 lg:h-10 lg:w-10" />
      </button>
    </div>
  );
}
