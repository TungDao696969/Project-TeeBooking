"use client";

import { useParams } from "next/navigation";
import { useRoomDetail } from "@/hooks/admin/room/use-room-detail";
import Link from "next/link";
export default function RoomDetail() {
  const params = useParams();
  const roomId = params.id as string;
  const { data: room, isLoading } = useRoomDetail(roomId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-zinc-500">Không tìm thấy phòng chiếu.</p>
      </div>
    );
  }

  const vipSeats = room.seats?.filter((s) => s.seatType === "vip") ?? [];
  const standardSeats =
    room.seats?.filter((s) => s.seatType === "standard") ?? [];
  const coupleSeats = room.seats?.filter((s) => s.seatType === "couple") ?? [];

  return (
    <div className="space-y-5 pb-10">
      {/* ── HEADER ── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125V5.625m0 12.75V5.625m0 0A1.125 1.125 0 014.5 4.5h15a1.125 1.125 0 011.125 1.125M20.625 19.5h-1.5c-.621 0-1.125-.504-1.125-1.125m2.625 1.125V5.625m0 0a1.125 1.125 0 00-1.125-1.125"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-white truncate">
            {room.roomName}
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            {room.cinema?.name ?? "—"} · Quản lý phòng chiếu
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/room/${room.id}/seats`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                 bg-red-600 hover:bg-red-500
                 text-white text-sm font-medium
                 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
            Xem ghế
          </Link>

          <StatusBadge />
        </div>
      </div>

      {/* ── ROOM INFO ── */}
      <Section title="Thông tin phòng">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
          <InfoItem label="Tên phòng" value={room.roomName} />
          <InfoItem label="Loại phòng">
            <TypeBadge value={room.roomType} />
          </InfoItem>
          <InfoItem label="Màn hình" value={room.screenType} />
          <InfoItem label="Âm thanh" value={room.soundSystem} />
          <InfoItem label="Tổng ghế" value={String(room.totalSeats)} />
          <InfoItem label="Rạp" value={room.cinema?.name ?? "—"} />
        </div>
      </Section>

      {/* ── SEAT STATS ── */}
      <Section title="Thống kê ghế">
        <div className="flex flex-wrap gap-3">
          <SeatStatPill
            type="standard"
            count={standardSeats.length}
            label="Standard"
          />
          <SeatStatPill type="vip" count={vipSeats.length} label="VIP" />
          <SeatStatPill
            type="couple"
            count={coupleSeats.length}
            label="Couple"
          />
        </div>
      </Section>

      {/* ── SEAT MAP ── */}
      <Section title="Sơ đồ ghế ngồi">
        {/* Screen bar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-3/4 h-1.5 bg-gradient-to-r from-red-900 via-red-500 to-red-900 rounded-b-full opacity-80" />
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1.5">
            Màn hình
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-10 gap-1.5">
          {room.seats?.map((seat) => (
            <SeatCell key={seat.id} code={seat.seatCode} type={seat.seatType} />
          )) ?? (
            <p className="col-span-10 text-sm text-zinc-500">
              Không có dữ liệu ghế.
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-5 justify-center">
          <LegendItem color="bg-zinc-700 border-zinc-600" label="Standard" />
          <LegendItem color="bg-amber-900 border-amber-700" label="VIP" />
          <LegendItem color="bg-pink-950 border-pink-800" label="Couple" />
        </div>
      </Section>

      {/* ── SHOWTIMES ── */}
      <Section title="Lịch chiếu">
        {(room.showtimes?.length ?? 0) === 0 ? (
          <p className="text-sm text-zinc-500">Chưa có lịch chiếu.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {room.showtimes?.map((showtime) => {
              const d = new Date(showtime.startTime);
              const time = d.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const date = d.toLocaleDateString("vi-VN", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              return (
                <div
                  key={showtime.id}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{time}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{date}</p>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Còn vé
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

/* ── SUB-COMPONENTS ── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-0.5 h-4 bg-red-600 rounded-full" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function InfoItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] text-zinc-500 mb-1 uppercase tracking-wider">
        {label}
      </p>
      {children ?? (
        <p className="text-sm font-medium text-zinc-100">{value ?? "—"}</p>
      )}
    </div>
  );
}

function TypeBadge({ value }: { value: string }) {
  return (
    <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-md bg-violet-900/60 text-violet-300 border border-violet-700/50">
      {value}
    </span>
  );
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-green-900/40 text-green-400 border border-green-700/40 shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      Hoạt động
    </span>
  );
}

function SeatStatPill({
  type,
  count,
  label,
}: {
  type: "standard" | "vip" | "couple";
  count: number;
  label: string;
}) {
  const styles = {
    standard: "bg-zinc-900 border-zinc-700 text-zinc-300 [&>span]:bg-zinc-600",
    vip: "bg-amber-950/60 border-amber-800/60 text-amber-300 [&>span]:bg-amber-500",
    couple:
      "bg-pink-950/60 border-pink-900/60 text-pink-300 [&>span]:bg-pink-500",
  };
  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium ${styles[type]}`}
    >
      <span className="w-2 h-2 rounded-sm shrink-0" />
      {label}
      <strong className="ml-1">{count}</strong>
    </div>
  );
}

function SeatCell({
  code,
  type,
}: {
  code: string;
  type: "standard" | "vip" | "couple";
}) {
  const base =
    "h-8 rounded-md flex items-center justify-center text-[9px] font-medium border transition-opacity hover:opacity-80 cursor-default select-none";
  const styles = {
    standard: "bg-zinc-800 text-zinc-400 border-zinc-700",
    vip: "bg-amber-900/80 text-amber-300 border-amber-700/70",
    couple: "bg-pink-950 text-pink-300 border-pink-800/70",
  };
  return (
    <div className={`${base} ${styles[type]}`} title={`${code} · ${type}`}>
      {code}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-sm border ${color}`} />
      <span className="text-[11px] text-zinc-500">{label}</span>
    </div>
  );
}
