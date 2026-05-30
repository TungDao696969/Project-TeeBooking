import { ShowTime } from "@/types/booking.type";

type Props = {
  showtime: ShowTime;
};

export default function BookingMovie({ showtime }: Props) {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      {/* Poster */}
      <div className="relative flex-shrink-0 w-24">
        <img
          src={showtime.movie.posterUrl}
          className="w-full h-full object-cover"
          alt={showtime.movie.title}
        />
        {/* fade to right */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, transparent 50%, #18181b)",
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-2 px-4 py-4 flex-1 min-w-0">
        <h2
          className="leading-tight truncate"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            color: "#F0EFE8",
            letterSpacing: "1px",
          }}
        >
          {showtime.movie.title}
        </h2>

        <p
          className="flex items-center gap-1 text-sm font-medium"
          style={{ color: "#E8B84B" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {showtime.room.cinema.name}
        </p>

        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            {showtime.room.roomName}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {showtime.movie.durationMinutes} phút
          </span>
        </div>

        {/* Showtime pill */}
        <div
          className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 border border-zinc-700"
          style={{ background: "#26262E" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E8B84B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {new Date(showtime.startTime).toLocaleString("vi-VN", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
