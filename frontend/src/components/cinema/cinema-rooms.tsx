import { Card } from "@/components/ui/card";

import { Room } from "@/types/cinema.type";

interface Props {
  rooms: Room[];
}

export default function CinemaRooms({ rooms }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {rooms.map((room) => (
        <Card
          key={room.id}
          className="border border-white/10 bg-[#101935] p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{room.roomName}</h3>

            <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-sm font-semibold text-yellow-400">
              {room.roomType}
            </span>
          </div>

          <div className="mt-6 space-y-4 text-white/80">
            <div className="flex justify-between">
              <span>Loại màn hình</span>

              <span className="font-semibold text-white">
                {room.screenType}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Âm thanh</span>

              <span className="font-semibold text-white">
                {room.soundSystem}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Số ghế</span>

              <span className="font-semibold text-white">
                {room.totalSeats}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
