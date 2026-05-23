import { Star } from "lucide-react";
import { Review } from "@/types/movie.type";
interface Props {
  reviews: Review[];
}
export default function MovieReviews({ reviews }: Props) {
  return (
    <div className="rounded-2xl bg-[#1E1A5E] p-8">
      <h2 className="mb-6 text-3xl font-extrabold uppercase italic text-white">
        Đánh Giá
      </h2>

      <div className="space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white">{review.user.fullName}</h3>

                <p className="text-sm text-white/50">
                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div className="flex gap-1">
                {Array.from({
                  length: review.rating,
                }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 text-white/80">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
