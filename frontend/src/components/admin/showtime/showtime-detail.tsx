"use client";

import dayjs from "dayjs";
import { useShowtimeByID } from "@/hooks/admin/showtime/use-showtime-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
interface Props {
  id: string;
}

export default function ShowtimeDetail({ id }: Props) {
  const { data, isPending, isError } = useShowtimeByID(id);

  if (isPending) {
    return (
      <div className="bg-[#0f0d0d] rounded-2xl p-7 animate-pulse">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#221a18]">
          <div className="w-10 h-10 bg-[#1a1210] rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-[#1a1210] rounded" />
            <div className="h-3 w-24 bg-[#141010] rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-[#1a1210] rounded-xl overflow-hidden mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#141010] p-4">
              <div className="h-3 w-16 bg-[#1a1210] rounded mb-2" />
              <div className="h-5 w-28 bg-[#1a1210] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-[#0f0d0d] rounded-2xl p-7 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#2a0e0c] rounded-lg flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <div>
          <p className="text-[#f0e8e0] text-sm font-sans">
            Không tìm thấy suất chiếu
          </p>
          <p className="text-[#6a5040] text-xs font-sans mt-0.5">ID: {id}</p>
        </div>
      </div>
    );
  }

  const duration = dayjs(data.endTime).diff(dayjs(data.startTime), "minute");

  return (
    <div className="bg-[#0f0d0d] rounded-2xl p-7 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-5 border-b border-[#221a18]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m17.25-11.25H6.375a1.125 1.125 0 00-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M17.625 4.5h1.5c.621 0 1.125.504 1.125 1.125v1.5"
              />
            </svg>
          </div>
          <div>
            <p className="text-[#f0e8e0] text-lg font-medium leading-tight">
              {data.movie.title}
            </p>
            <p className="text-[#7a6a60] text-xs tracking-widest uppercase mt-0.5">
              Chi tiết suất chiếu
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="px-2.5 py-1 bg-[#2a0e0c] border border-[#7a2020] rounded-full text-[11px] text-[#e07060] tracking-wide">
            {data.format}
          </span>
          <span className="text-[11px] text-[#4a3028]">ID: {id}</span>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-2 gap-px bg-[#1a1210] rounded-xl overflow-hidden mb-4">
        <Cell label="Phòng chiếu" icon="building">
          <span className="text-xl text-[#f0e8e0] font-medium">
            {data.room.name}
          </span>
        </Cell>

        <Cell label="Ngày chiếu" icon="calendar">
          <span className="text-xl text-[#f0e8e0] font-medium">
            {dayjs(data.showDate).format("DD/MM/YYYY")}
          </span>
        </Cell>

        <Cell label="Bắt đầu" icon="clock">
          <span className="text-2xl text-[#f0e8e0] font-medium">
            {dayjs(data.startTime).format("HH:mm")}
          </span>
          <span className="text-xs text-[#5a4030]">
            {dayjs(data.startTime).format("DD/MM/YYYY")}
          </span>
        </Cell>

        <Cell label="Kết thúc" icon="clock">
          <span className="text-2xl text-[#f0e8e0] font-medium">
            {dayjs(data.endTime).format("HH:mm")}
          </span>
          <span className="text-xs text-[#5a4030]">
            {dayjs(data.endTime).format("DD/MM/YYYY")}
          </span>
        </Cell>

        <div className="col-span-2 bg-[#141010] px-4 py-3.5 border-t border-[#1a1210]">
          <p className="text-[11px] text-[#6a5040] tracking-widest uppercase mb-1.5">
            Giá vé cơ bản
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl text-red-600 font-medium">
              {data.basePrice.toLocaleString("vi-VN")}
            </span>
            <span className="text-sm text-[#7a5040]">₫ / ghế</span>
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Định dạng">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1e1210] border border-[#3a2020] rounded text-xs text-[#c09080]">
            {data.format}
          </span>
        </Stat>
        <Stat label="Ngôn ngữ">
          <span className="text-sm text-[#d0c0b4]">{data.language}</span>
        </Stat>
        <Stat label="Thời lượng">
          <span className="text-sm text-[#d0c0b4]">{duration} phút</span>
        </Stat>
      </div>
      <div className="mt-5 ">
        <Button variant="outline" className="bg-red-500" asChild>
          <Link href="/admin/showtime">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Showtime
          </Link>
        </Button>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────── */

function Cell({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#141010] px-4 py-3.5 flex flex-col gap-1">
      <span className="text-[11px] text-[#6a5040] tracking-widest uppercase flex items-center gap-1.5">
        {icon === "building" && <BuildingIcon />}
        {icon === "calendar" && <CalendarIcon />}
        {icon === "clock" && <ClockIcon />}
        {label}
      </span>
      {children}
    </div>
  );
}

function Stat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#141010] rounded-lg px-3.5 py-3 flex flex-col gap-1">
      <span className="text-[11px] text-[#6a5040] tracking-widest uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
