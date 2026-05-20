import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/home.type";
import { getImageUrl } from "@/lib/image";

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieSection({ title, movies }: Props) {
  const buttonLabel = (movie: Movie) => {
    if (movie.status === "coming_soon") {
      return "Tìm Hiểu Ngay";
    }

    if (!movie.status && title.toLowerCase().includes("sắp chiếu")) {
      return "Tìm Hiểu Ngay";
    }

    return "Đặt Vé";
  };

  return (
    <section className="py-12">
      {/* Title */}
      <div className="mb-10 flex items-center justify-center">
        <h2 className="text-center text-3xl font-extrabold uppercase italic text-white md:text-4xl">
          {title}
        </h2>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie: Movie) => (
          <div key={movie.id} className="overflow-hidden rounded-2xl">
            {/* Poster */}
            <div className="relative">
              <Image
                src={getImageUrl(movie.posterUrl ?? "")}
                alt={movie.title}
                width={400}
                height={600}
                className="aspect-[2/3] w-full object-cover"
              />

              {/* Tags */}
              <div className="absolute left-2 top-2 flex gap-1.5">
                {/* Format tag: 2D */}
                <span className="rounded bg-[#F5A623] px-2 py-0.5 text-xs font-bold text-black">
                  2D
                </span>

                {/* Age/category tag: K */}
                <span className="flex items-center rounded bg-[#E8192C] px-1.5 py-0.5 text-xs font-extrabold text-white leading-none">
                  K
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col px-3 py-3">
              {/* Title */}
              <h3 className="line-clamp-2 min-h-[56px] text-center text-base font-extrabold uppercase text-white md:text-lg">
                {movie.title}
              </h3>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                {/* Trailer */}
                <Link
                  href={movie.trailerUrl || "#"}
                  className="flex shrink-0 items-center gap-1.5 text-white"
                >
                  <div className="rounded-full border border-1">
                    <Image
                      src={getImageUrl(
                        "https://cinestar.com.vn/assets/images/icon-play-vid.svg",
                      )}
                      alt={movie.title}
                      width={100}
                      height={400}
                      className="w-[20px] object-cover"
                    />
                  </div>
                  {/* Ẩn text trên mobile, hiện từ md trở lên */}
                  <span className="hidden text-xs font-semibold md:inline md:text-sm">
                    Xem Trailer
                  </span>
                </Link>

                {/* Book */}
                <Button className="ml-auto h-10 min-w-0 shrink rounded-md bg-yellow-400 px-2 text-xs font-extrabold uppercase text-black hover:bg-yellow-300 md:px-4 md:text-sm">
                  <span className="block text-center leading-tight break-words hyphens-auto">
                    {buttonLabel(movie)}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className=" items-center justify-center">
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-3 w-3 rounded-full bg-white" />
          <span className="h-3 w-3 rounded-full bg-white/40" />
          <span className="h-3 w-3 rounded-full bg-white/40" />
        </div>

        {/* Xem Thêm Button */}
        <div className="mt-6 flex items-center justify-center">
          <Button
            variant="outline"
            className="rounded-md border-2 border-yellow-400 bg-transparent px-16 py-5 text-base font-extrabold uppercase tracking-widest text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
          >
            Xem Thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
