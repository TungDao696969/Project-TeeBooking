import Image from "next/image";
import { Clock, MapPin, Armchair, Barcode } from "lucide-react";
import { PastBooking } from "@/types/booking.type";
import { BookingStatus } from "@/types/booking.type";
const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    cls: string;
  }
> = {
  pending: {
    label: "Pending",
    cls: "bg-yellow-950 text-yellow-400 border border-yellow-900",
  },

  confirmed: {
    label: "Confirmed",
    cls: "bg-blue-950 text-blue-400 border border-blue-900",
  },

  completed: {
    label: "Completed",
    cls: "bg-green-950 text-green-400 border border-green-900",
  },

  cancelled: {
    label: "Cancelled",
    cls: "bg-red-950 text-red-400 border border-red-900",
  },

  refunded: {
    label: "Refunded",
    cls: "bg-amber-950 text-amber-400 border border-amber-900",
  },
};

export default function BookingCard({ booking }: { booking: PastBooking }) {
  const cfg = statusConfig[booking.status] ?? statusConfig.cancelled;
  const seats = booking.tickets
    .map((t) => t.showtimeSeat.seat.seatCode)
    .join(", ");

  return (
    <div className="group flex gap-3.5 bg-[#1a1a1a] border border-[#252525] hover:border-[#c8102e] rounded-xl p-4 transition-colors cursor-pointer">
      <Image
        src={booking.showtime.movie.posterUrl}
        alt={booking.showtime.movie.title}
        width={72}
        height={104}
        className="rounded-lg object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <h3 className="text-[15px] font-medium text-[#f0f0f0] truncate">
          {booking.showtime.movie.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-[#888]">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          {booking.showtime.startTime} · {booking.showtime.date}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#888]">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {booking.showtime.cinema.name}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#888]">
          <Armchair className="w-3.5 h-3.5 flex-shrink-0" />
          Ghế: {seats}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#888]">
          <Barcode className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-mono">{booking.bookingCode}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-[#252525]">
          <span className="text-sm font-medium text-[#c8102e]">
            {booking.finalAmount.toLocaleString("vi-VN")}đ
          </span>
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${cfg.cls}`}
          >
            {cfg.label}
          </span>
        </div>
      </div>
    </div>
  );
}
