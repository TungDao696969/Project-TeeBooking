"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import BookingCard from "./booking-card";
import { usePastBookings } from "@/hooks/booking/use-past-bookings";
import { useBookingStore } from "@/store/booking.store";

export default function BookingHistory() {
  const [page, setPage] = useState(1);
  const { search, status, setSearch, setStatus } = useBookingStore();
  const { data, isLoading } = usePastBookings({ page, status, search });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-[#555]">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555] pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#c8102e] rounded-lg text-sm text-[#eee] placeholder:text-[#555] outline-none transition-colors"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 pl-3 pr-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#eee] outline-none cursor-pointer appearance-none"
        >
          <option value="all">Tất cả</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5">
        {data?.data.length === 0 ? (
          <p className="text-center py-12 text-sm text-[#555]">
            Không tìm thấy vé nào
          </p>
        ) : (
          data?.data.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-9 h-9 flex items-center justify-center bg-transparent border border-[#2a2a2a] hover:border-[#444] hover:bg-[#1e1e1e] rounded-lg text-[#aaa] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs text-[#666] min-w-[56px] text-center">
          {page} / {data?.pagination.totalPages ?? 1}
        </span>
        <button
          disabled={page === data?.pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="w-9 h-9 flex items-center justify-center bg-transparent border border-[#2a2a2a] hover:border-[#444] hover:bg-[#1e1e1e] rounded-lg text-[#aaa] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
