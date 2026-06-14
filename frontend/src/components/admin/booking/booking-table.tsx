"use client";

import dayjs from "dayjs";
import { Eye, Search } from "lucide-react";
import { AdminBooking } from "@/types/admin/booking.type";
import Pagination from "@/components/admin/user/pagination";
import { useAdminBookingStore } from "@/store/admin/booking.store";
import { useAdminBookings } from "@/hooks/admin/booking/use-bookings";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus } from "@/types/admin/booking.type";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  bookings: AdminBooking[];
}

// ── Badge helpers ──────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-950/60 text-yellow-500 border border-yellow-900/40",
  CONFIRMED: "bg-green-950/60 text-green-400 border border-green-900/50",
  COMPLETED: "bg-blue-950/60 text-blue-400 border border-blue-900/50",
  CANCELLED: "bg-red-950/60 text-red-400 border border-red-900/50",
  REFUNDED: "bg-orange-950/60 text-orange-400 border border-orange-900/50",
};

function StatusBadge({ status }: { status: string }) {
  const cls =
    STATUS_STYLES[status.toUpperCase()] ??
    "bg-zinc-800 text-zinc-400 border border-zinc-700";
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${cls}`}
    >
      {status}
    </span>
  );
}

// ── Action button ──────────────────────────────────────────────
function ActionBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="w-[30px] h-[30px] rounded-lg border inline-flex items-center justify-center transition-colors border-yellow-900/30 text-zinc-500 hover:border-yellow-500/60 hover:text-yellow-500 bg-[#13120e]"
    >
      {icon}
    </button>
  );
}

// ── Table ──────────────────────────────────────────────────────
const TH_CLASS =
  "px-3 py-2.5 text-left text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap";

export default function BookingTable({ bookings }: Props) {
  const { page, limit, setPage, search, setSearch, statusFilter, setStatusFilter } =
    useAdminBookingStore();
  const { data } = useAdminBookings(page, limit, search, statusFilter);

  const [localSearch, setLocalSearch] = useState(search);
  const [debouncedSearch] = useDebounce(localSearch, 500);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0d0d0f", fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 pt-6 pb-4 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-8 rounded-full shrink-0"
            style={{ background: "#c9a84c" }}
          />
          <div>
            <h2
              className="text-xl tracking-widest m-0 leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#c9a84c" }}
            >
              Quản lý đặt vé
            </h2>
            <p className="text-[11px] tracking-widest uppercase mt-0.5 text-zinc-600">
              Cinestar Cinema · Admin Panel
            </p>
          </div>
          <span
            className="ml-4 text-xs px-3 py-1 rounded-full border hidden sm:inline-block"
            style={{
              background: "#1a1710",
              borderColor: "#3a3020",
              color: "#c9a84c",
            }}
          >
            {data?.pagination.total || 0} lượt đặt
          </span>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Tìm mã vé, email, sđt..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 h-9 bg-zinc-900/50 border-zinc-800 focus-visible:ring-yellow-500/50"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(val) =>
              setStatusFilter(val as BookingStatus | "all")
            }
          >
            <SelectTrigger className="w-[140px] h-9 bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ thanh toán</SelectItem>
              <SelectItem value="confirmed">Đã xác nhận</SelectItem>
              <SelectItem value="completed">Đã hoàn thành</SelectItem>
              <SelectItem value="cancelled">Đã huỷ</SelectItem>
              <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#111009" }}>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Mã vé</th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Khách hàng</th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Phim & Rạp</th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Thời gian chiếu</th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Tổng tiền</th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Trạng thái</th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>Ngày đặt</th>
              <th className={TH_CLASS} />
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-zinc-500">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b transition-colors hover:bg-zinc-900/30"
                  style={{ borderColor: "#191714" }}
                >
                  <td className="px-3 py-2.5">
                    <span className="font-mono text-sm text-yellow-500 font-semibold uppercase tracking-wider">
                      {booking.bookingCode}
                    </span>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="text-sm font-medium leading-tight text-[#e8e0d0]">
                      {booking.user.fullName}
                    </p>
                    <p className="text-xs mt-0.5 text-[#6a6050]">
                      {booking.user.phone || booking.user.email}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="text-sm font-medium text-[#e8e0d0] max-w-[200px] truncate">
                      {booking.showtime.movie.title}
                    </p>
                    <p className="text-xs mt-0.5 text-[#6a6050]">
                      {booking.showtime.room.cinema.name} - {booking.showtime.room.roomName}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 text-sm text-[#9a9080]">
                    {dayjs(booking.showtime.startTime).format("DD/MM/YYYY HH:mm")}
                  </td>

                  <td className="px-3 py-2.5 text-sm font-semibold text-white">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(booking.finalAmount)}
                  </td>

                  <td className="px-3 py-2.5">
                    <StatusBadge status={booking.status} />
                  </td>

                  <td className="px-3 py-2.5 text-xs tabular-nums text-[#5a5248]">
                    {dayjs(booking.bookedAt).format("DD/MM/YYYY HH:mm")}
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex gap-1.5 justify-end">
                      <Link href={`/admin/booking/${booking.id}`}>
                        <ActionBtn icon={<Eye size={14} />} label="Xem" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {data?.pagination && data.pagination.totalPages > 1 && (
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
