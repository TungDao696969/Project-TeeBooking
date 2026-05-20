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

  const currentBanner = banners[currentIndex];

  // Next
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // Prev
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden rounded-xl">
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
        className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 text-white transition hover:scale-110"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 text-white transition hover:scale-110"
      >
        <ChevronRight className="h-10 w-10" />
      </button>
    </div>
  );
}
