import { Card } from "@/components/ui/card";
import { TicketType } from "@/types/booking.type";

type Props = {
  tickets: TicketType[];
};

export default function BookingSeats({ tickets }: Props) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Ghế đã đặt</h3>

      <div className="flex gap-2 flex-wrap">
        {tickets.map((t) => (
          <span key={t.id} className="px-3 py-1 bg-gray-100 rounded">
            {t.showtimeSeat.seat.seatCode}
          </span>
        ))}
      </div>
    </Card>
  );
}
