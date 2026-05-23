import { Movie } from "@/types/movie.type";
interface Props {
  movie: Movie;
}
export default function MovieInfoCard({ movie }: Props) {
  return (
    <div className="rounded-2xl bg-[#1E1A5E] p-6">
      <h2 className="mb-6 text-2xl font-extrabold uppercase text-white">
        Thông Tin
      </h2>

      <div className="space-y-5 text-sm">
        <div>
          <p className="text-white/50">Nhà sản xuất</p>
          <p className="font-bold text-white">{movie.producer}</p>
        </div>

        <div>
          <p className="text-white/50">Ngôn ngữ</p>
          <p className="font-bold text-white">{movie.language}</p>
        </div>

        <div>
          <p className="text-white/50">Phụ đề</p>
          <p className="font-bold text-white">{movie.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
