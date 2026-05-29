"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cast, Review } from "@/types/movie.type";

interface Props {
  description: string;
  casts: Cast[];
  reviews: Review[];
}

export default function MovieTabs({ description, casts, reviews }: Props) {
  return (
    <Tabs defaultValue="about">
      <TabsList className="mb-10 bg-zinc-900">
        <TabsTrigger value="about">Nội dung</TabsTrigger>

        <TabsTrigger value="casts">Diễn viên</TabsTrigger>

        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-lg leading-9 text-zinc-300">{description}</p>
        </div>
      </TabsContent>

      <TabsContent value="casts">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {casts.map((cast) => (
            <div
              key={cast.id}
              className="rounded-3xl bg-zinc-900 p-5 transition hover:-translate-y-2"
            >
              <div className="aspect-square rounded-full bg-zinc-800" />

              <h3 className="mt-5 text-lg font-bold">{cast.fullName}</h3>

              <p className="mt-1 text-sm text-zinc-400">
                {cast.characterName || cast.roleType}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews">
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{review.user?.fullName}</h3>

                <div className="flex items-center gap-2">
                  ⭐ {review.rating}
                </div>
              </div>

              <p className="mt-4 leading-8 text-zinc-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
