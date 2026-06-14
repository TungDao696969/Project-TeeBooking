"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

import { DateGroup } from "@/types/cinema.type";
import { useBookingStore } from "@/store/booking.store";

interface Props {
  date: DateGroup;
}

function formatVietnameseDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy"
    ];
    
    const dayName = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    
    return `${dayName}, ${dd}/${mm}/${yyyy}`;
  } catch (e) {
    return dateStr;
  }
}

export default function ShowtimeGroup({ date }: Props) {
  const router = useRouter();
  const { setSelectedShowtime } = useBookingStore();
  const [isOpen, setIsOpen] = useState(true);

  const formattedDate = formatVietnameseDate(date.date);

  return (
    <div className="w-full">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between px-4 py-3 bg-[#0B172E] text-white border border-white/10 hover:bg-white/5 transition focus:outline-none ${
          isOpen ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <span className="font-semibold text-sm md:text-base">{formattedDate}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-4 space-y-5 bg-[#0B172E]/30 border-x border-b border-white/10 rounded-b-xl">
          {date.formats.map((format) => (
            <div key={format.type} className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                {format.type}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {format.showtimes.map((showtime) => (
                  <button
                    key={showtime.id}
                    onClick={() => {
                      setSelectedShowtime(showtime.id);
                      router.push(`/booking/${showtime.id}`);
                    }}
                    className="rounded-lg border border-white/15 bg-[#13203A]/70 px-4 py-2 text-sm font-bold text-white transition hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 focus:outline-none"
                  >
                    {showtime.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
