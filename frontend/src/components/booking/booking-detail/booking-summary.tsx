import { BookingSummaryType } from "@/types/booking-detail";

type Props = {
  booking: BookingSummaryType;
};

export default function BookingSummary({ booking }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E8B84B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Tổng kết đơn hàng
      </p>

      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
            </svg>
            Vé
          </span>
          <span className="text-sm font-medium text-zinc-200">
            {booking.totalTicketPrice.toLocaleString()} VND
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            Combo
          </span>
          <span className="text-sm font-medium text-zinc-200">
            {booking.totalComboPrice.toLocaleString()} VND
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-zinc-700 border-dashed" />

      {/* Total */}
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-zinc-300">Tổng cộng</span>
        <div>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "26px",
              color: "#E8B84B",
              letterSpacing: "1px",
            }}
          >
            {booking.finalAmount.toLocaleString()}
          </span>
          <span className="text-xs ml-1" style={{ color: "#C9981F" }}>
            VND
          </span>
        </div>
      </div>
    </div>
  );
}
