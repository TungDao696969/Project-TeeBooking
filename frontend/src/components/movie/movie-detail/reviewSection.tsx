"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, MessageSquarePlus, X, Send } from "lucide-react";

import { Review, Ratings } from "@/types/movie.type";

interface ReviewSectionProps {
  ratings?: Ratings;
  reviews: Review[];
}

function StarRating({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${s <= rating ? "fill-yellow-400 text-yellow-400" : "fill-white/10 text-white/10"}`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string | undefined) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(-2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Distribution bar giả dựa trên reviews thật
function RatingBar({ star, reviews }: { star: number; reviews: Review[] }) {
  const count = reviews.filter((r) => r.rating === star).length;
  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 text-right text-xs text-white/50">{star}</span>
      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-4 text-xs text-white/40">{count}</span>
    </div>
  );
}

export default function ReviewSection({
  ratings,
  reviews,
}: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Calculate ratings from reviews if not provided
  const calculatedRatings = ratings || {
    totalReviews: reviews.length,
    averageRating:
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
  };

  const handleSubmit = () => {
    if (!selectedStar || !comment.trim()) return;
    // TODO: gọi API POST /reviews
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setSelectedStar(0);
      setComment("");
    }, 2000);
  };

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          Đánh Giá
        </h2>
        <span className="ml-auto text-xs text-white/40">
          {calculatedRatings.totalReviews} đánh giá
        </span>
      </div>

      {/* Tổng quan rating */}
      <div className="mb-6 flex gap-6">
        {/* Điểm to */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-4">
          <span className="text-5xl font-black text-white leading-none">
            {calculatedRatings.averageRating.toFixed(1)}
          </span>
          <StarRating rating={Math.round(calculatedRatings.averageRating)} />
          <span className="mt-1 text-xs text-white/40">
            {calculatedRatings.totalReviews} lượt
          </span>
        </div>

        {/* Distribution */}
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          {[5, 4, 3, 2, 1].map((s) => (
            <RatingBar key={s} star={s} reviews={reviews} />
          ))}
        </div>
      </div>

      {/* Nút viết đánh giá */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg border border-yellow-400/30 bg-yellow-400/10 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20"
        >
          <MessageSquarePlus className="h-4 w-4" />
          Viết đánh giá của bạn
        </button>
      )}

      {/* Form viết đánh giá */}
      {showForm && (
        <div className="mb-5 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Đánh giá của bạn</p>
            <button
              onClick={() => setShowForm(false)}
              className="text-white/40 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chọn sao */}
          <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverStar(s)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => setSelectedStar(s)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-7 w-7 transition-colors ${
                    s <= (hoverStar || selectedStar)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-white/10 text-white/10"
                  }`}
                />
              </button>
            ))}
            {selectedStar > 0 && (
              <span className="ml-2 self-center text-xs text-yellow-300">
                {
                  ["", "Tệ", "Không hay", "Bình thường", "Hay", "Tuyệt vời"][
                    selectedStar
                  ]
                }
              </span>
            )}
          </div>

          {/* Textarea */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Chia sẻ cảm nhận của bạn về bộ phim..."
            rows={3}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/20"
          />

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-white/30">
              {comment.length}/500 ký tự
            </span>
            <button
              onClick={handleSubmit}
              disabled={!selectedStar || !comment.trim() || submitted}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition active:scale-95 ${
                submitted
                  ? "bg-green-500/20 text-green-400"
                  : !selectedStar || !comment.trim()
                    ? "cursor-not-allowed bg-white/5 text-white/30"
                    : "bg-yellow-400 text-[#081733] hover:bg-yellow-300"
              }`}
            >
              {submitted ? (
                "Đã gửi!"
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Gửi đánh giá
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Danh sách review */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Star className="h-8 w-8 text-white/15" />
          <p className="text-sm text-white/50">
            Chưa có đánh giá nào. Hãy là người đầu tiên!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/15"
            >
              <div className="mb-2 flex items-start gap-3">
                {/* Avatar */}
                {review.user?.avatarUrl ? (
                  <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image
                      src={review.user.avatarUrl}
                      alt={review.user.fullName || "User"}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-bold text-purple-300 ring-1 ring-white/10">
                    {getInitials(review.user?.fullName)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-white">
                      {review.user?.fullName || "Anonymous"}
                    </p>
                    <time className="flex-shrink-0 text-xs text-white/35">
                      {formatDate(review.createdAt)}
                    </time>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </div>

              <p className="text-sm leading-relaxed text-white/75">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
