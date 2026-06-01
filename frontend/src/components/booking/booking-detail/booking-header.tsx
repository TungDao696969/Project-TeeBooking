import { Booking } from "@/types/booking-detail";

type Props = {
  booking: Booking;
};

const statusStyle: Record<string, string> = {
  CONFIRMED: "bg-emerald-950 text-emerald-400 border border-emerald-800",
  PENDING: "bg-yellow-950 text-yellow-400 border border-yellow-800",
  CANCELLED: "bg-red-950 text-red-400 border border-red-800",
};

const paymentStyle: Record<string, string> = {
  PAID: "bg-blue-950 text-blue-400 border border-blue-800",
  UNPAID: "bg-zinc-800 text-zinc-400 border border-zinc-700",
  REFUNDED: "bg-purple-950 text-purple-400 border border-purple-800",
};

export default function BookingHeader({ booking }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{
          background: "linear-gradient(135deg,#1A1208,#241A0A)",
          borderBottom: "0.5px solid #3A2E0E",
        }}
      >
        <span
          className="font-black tracking-widest text-lg"
          style={{
            color: "#E8B84B",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "3px",
          }}
        >
          ★ TEEBOOKING
        </span>
        <span
          className="text-xs tracking-widest font-medium"
          style={{ color: "#C9981F" }}
        >
          #{booking.bookingCode}
        </span>
      </div>

      {/* Body */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            Trạng thái
          </span>
          <div className="flex gap-2">
            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-md uppercase tracking-wide ${statusStyle[booking.status] ?? "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
            >
              {booking.status}
            </span>
            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-md uppercase tracking-wide ${paymentStyle[booking.paymentStatus] ?? "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
            >
              {booking.paymentStatus}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
            Tổng tiền
          </p>
          <p
            className="leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "28px",
              color: "#E8B84B",
              letterSpacing: "1px",
            }}
          >
            {booking.finalAmount.toLocaleString()}
            <span className="text-sm ml-1" style={{ color: "#C9981F" }}>
              VND
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
