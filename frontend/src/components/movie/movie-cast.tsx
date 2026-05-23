import { Cast } from "@/types/movie.type";
interface Props {
  title: string;
  data: Cast[];
}
export default function MovieCast({ title, data }: Props) {
  return (
    <div className="rounded-2xl bg-[#1E1A5E] p-6">
      <h2 className="mb-6 text-2xl font-extrabold uppercase text-white">
        {title}
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="rounded-xl bg-white/5 p-4">
            <h3 className="font-bold text-white">{item.fullName}</h3>

            <p className="text-sm text-white/50">
              {item.characterName || item.nationality}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
