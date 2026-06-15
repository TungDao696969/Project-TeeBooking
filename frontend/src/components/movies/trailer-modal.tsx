"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Loader2 } from "lucide-react";
import { useTrailers, Trailer } from "@/hooks/movie/use-trailers";

interface TrailerModalProps {
  movieId: string;
  movieTitle: string;
  /** Fallback trailerUrl from movie record (used if no trailers in DB) */
  fallbackUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Extract YouTube video ID from any URL format using regex.
 * Handles:
 *   https://www.youtube.com/watch?v=ID
 *   https://youtu.be/ID
 *   https://www.youtube.com/embed/ID
 *   www.youtube.com/watch?v=ID  (no protocol)
 *   youtu.be/ID                 (no protocol)
 */
function extractYouTubeId(url: string): string | null {
  // Regex covers all known YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/v\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/i.test(url);
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function TrailerPlayer({ url }: { url: string }) {
  // Always try YouTube extraction first
  const ytId = extractYouTubeId(url);
  if (ytId) {
    const embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    return (
      <iframe
        key={embedUrl}
        src={embedUrl}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Trailer"
      />
    );
  }

  // Direct video file
  if (isDirectVideo(url)) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        src={url}
        controls
        autoPlay
        className="h-full w-full object-contain bg-black"
      />
    );
  }

  // If it looks like YouTube but regex failed (invalid/placeholder URL)
  if (isYouTubeUrl(url)) {
    return (
      <div className="flex flex-col items-center gap-4 text-white/60 px-6 text-center">
        <svg className="w-14 h-14 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <div>
          <p className="text-sm font-semibold text-white">URL trailer chưa hợp lệ</p>
          <p className="text-xs text-white/40 mt-1">
            Admin cần cập nhật URL YouTube đúng định dạng
            <br />(VD: https://www.youtube.com/watch?v=XXXXXXXX)
          </p>
        </div>
      </div>
    );
  }

  // Other unknown format — try iframe
  return (
    <iframe
      src={url}
      className="h-full w-full"
      allowFullScreen
      title="Trailer"
    />
  );
}

const TYPE_LABELS: Record<string, string> = {
  teaser: "Teaser",
  official: "Official Trailer",
  final: "Final Trailer",
  clip: "Clip",
  behind_the_scenes: "Hậu trường",
};

export default function TrailerModal({
  movieId,
  movieTitle,
  fallbackUrl,
  isOpen,
  onClose,
}: TrailerModalProps) {
  const { data: trailers = [], isLoading } = useTrailers(isOpen ? movieId : null);

  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset active when opened
  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Build trailer list — DB trailers first, then fallback
  const allTrailers: Array<{ label: string; url: string }> = [
    ...trailers
      .filter((t) => t.isActive)
      .map((t) => ({
        label: `${t.title}${t.type ? " · " + (TYPE_LABELS[t.type] ?? t.type) : ""}`,
        url: t.videoUrl,
      })),
  ];

  if (allTrailers.length === 0 && fallbackUrl) {
    allTrailers.push({ label: "Trailer", url: fallbackUrl });
  }

  const current = allTrailers[activeIndex];
  const hasMultiple = allTrailers.length > 1;

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Modal box */}
      <div
        className="relative flex flex-col w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#0b1633" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest">Trailer</p>
            <h3 className="text-white font-extrabold uppercase text-base leading-tight">
              {movieTitle}
            </h3>
            {current && (
              <p className="text-yellow-400 text-xs font-semibold mt-0.5">{current.label}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video area */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 */ }}>
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
            ) : current ? (
              <TrailerPlayer url={current.url} />
            ) : (
              <div className="flex flex-col items-center gap-3 text-white/40">
                <Play className="w-12 h-12" />
                <p className="text-sm">Chưa có trailer</p>
              </div>
            )}
          </div>
        </div>

        {/* Trailer list (if multiple) */}
        {hasMultiple && (
          <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto border-t border-white/10">
            {allTrailers.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  i === activeIndex
                    ? "bg-yellow-400 text-black"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Navigation arrows (for multiple) */}
        {hasMultiple && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none"
               style={{ transform: "translateY(-50%)" }}>
            <button
              className="pointer-events-auto flex items-center justify-center h-9 w-9 rounded-full bg-black/60 hover:bg-black/90 text-white transition disabled:opacity-20"
              onClick={() => setActiveIndex((p) => Math.max(p - 1, 0))}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="pointer-events-auto flex items-center justify-center h-9 w-9 rounded-full bg-black/60 hover:bg-black/90 text-white transition disabled:opacity-20"
              onClick={() => setActiveIndex((p) => Math.min(p + 1, allTrailers.length - 1))}
              disabled={activeIndex === allTrailers.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
