import { Card } from "@/components/ui/card";
import { ShowTime } from "@/types/booking.type";

type Props = {
  showtime: ShowTime;
};

export default function BookingMovie({ showtime }: Props) {
  return (
    <Card className="p-4 flex gap-4">
      <img
        src={showtime.movie.posterUrl}
        className="w-24 h-32 object-cover rounded"
        alt={showtime.movie.title}
      />

      <div>
        <h2 className="font-bold text-lg">{showtime.movie.title}</h2>

        <p>{showtime.room.cinema.name}</p>

        <p className="text-sm text-gray-500">
          {showtime.room.roomName} • {showtime.movie.durationMinutes} phút
        </p>
      </div>
    </Card>
  );
}
