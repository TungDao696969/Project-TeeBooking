"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X, Loader2, MapPin, Clock, ShieldAlert } from "lucide-react";
import { usePastBookings } from "@/hooks/booking/use-past-bookings";
import { useBookingStore } from "@/store/booking.store";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/services/booking.api";

export default function BookingHistory() {
  const [page, setPage] = useState(1);
  const { search, status, setSearch, setStatus } = useBookingStore();
  const { data, isLoading } = usePastBookings({ page, status, search });
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Fetch detailed booking when selected
  const { data: detailData, isLoading: isDetailLoading } = useQuery({
    queryKey: ["booking-detail", selectedBookingId],
    queryFn: () => getBookingById(selectedBookingId!),
    enabled: !!selectedBookingId,
  });

  const getStatusBadge = (statusStr: string) => {
    switch (statusStr) {
      case "confirmed":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950/60 text-blue-400 border border-blue-900/50">Đã xác nhận</span>;
      case "completed":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-950/60 text-green-400 border border-green-900/50">Đã hoàn thành</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-950/60 text-red-400 border border-red-900/50">Đã hủy</span>;
      case "refunded":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-950/60 text-amber-400 border border-amber-900/50">Đã hoàn tiền</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-zinc-800 text-zinc-300">Chờ xử lý</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#889fc4] pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-[#0f1d43] border border-[#1c356f] focus:border-[#e8b84b] rounded-lg text-sm text-white placeholder:text-[#556b9c] outline-none transition-colors"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 px-4 bg-[#0f1d43] border border-[#1c356f] focus:border-[#e8b84b] rounded-lg text-sm text-white outline-none cursor-pointer appearance-none min-w-[160px] pr-8 relative"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px'
          }}
        >
          <option value="all" className="bg-[#0f1d43]">Tất cả trạng thái</option>
          <option value="confirmed" className="bg-[#0f1d43]">Đã xác nhận</option>
          <option value="completed" className="bg-[#0f1d43]">Đã hoàn thành</option>
          <option value="cancelled" className="bg-[#0f1d43]">Đã hủy</option>
          <option value="refunded" className="bg-[#0f1d43]">Đã hoàn tiền</option>
        </select>
      </div>

      {/* Main Container */}
      <div className="overflow-hidden rounded-xl border border-[#1c356f] bg-[#0a1128]/80 backdrop-blur-md shadow-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-[#e8b84b] animate-spin" />
            <p className="text-sm text-[#889fc4]">Đang tải lịch sử mua hàng...</p>
          </div>
        ) : !data?.data || data.data.length === 0 ? (
          <div className="text-center py-20 px-4">
            <ShieldAlert className="w-16 h-16 text-[#e8b84b]/40 mx-auto mb-4" />
            <p className="text-lg font-medium text-white mb-1">Không tìm thấy vé nào</p>
            <p className="text-sm text-[#889fc4]">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#182d5a]/60 border-b border-[#1c356f]">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc] text-center">Mã đơn</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc]">Hoạt động</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc]">Chi nhánh</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc] text-center">Ngày</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc] text-right">Tổng cộng</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc] text-center">Điểm</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#a5b4fc] text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14264e]">
                  {data.data.map((booking) => {
                    const points = Math.floor(booking.finalAmount * 0.05);
                    return (
                      <tr
                        key={booking.id}
                        onClick={() => setSelectedBookingId(booking.id)}
                        className="hover:bg-[#182d5a]/30 transition-colors cursor-pointer"
                      >
                        <td className="p-4 text-center font-mono text-sm font-bold text-white hover:text-[#e8b84b]">
                          {booking.bookingCode}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-white truncate max-w-[200px]" title={booking.showtime?.movie?.title}>
                            {booking.showtime?.movie?.title}
                          </div>
                          <div className="text-xs text-[#889fc4] mt-0.5">
                            {booking.showtime?.room?.roomName || "Standard Room"}
                          </div>
                        </td>
                        <td className="p-4 text-[#eee] text-sm">
                          {booking.showtime?.cinema?.name}
                        </td>
                        <td className="p-4 text-center text-sm">
                          <div className="text-white font-medium">{booking.showtime?.startTime}</div>
                          <div className="text-xs text-[#889fc4] mt-0.5">{booking.showtime?.date}</div>
                        </td>
                        <td className="p-4 text-right font-bold text-[#e8b84b] text-sm">
                          {booking.finalAmount.toLocaleString("vi-VN")}đ
                        </td>
                        <td className="p-4 text-center font-bold text-green-400 text-sm">
                          +{points.toLocaleString("vi-VN")}
                        </td>
                        <td className="p-4 text-center">
                          {getStatusBadge(booking.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-[#14264e]">
              {data.data.map((booking) => {
                const points = Math.floor(booking.finalAmount * 0.05);
                return (
                  <div
                    key={booking.id}
                    onClick={() => setSelectedBookingId(booking.id)}
                    className="p-4 space-y-3 hover:bg-[#182d5a]/20 active:bg-[#182d5a]/40 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold text-white bg-[#182d5a] px-2 py-0.5 rounded">
                        {booking.bookingCode}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">
                        {booking.showtime?.movie?.title}
                      </h4>
                      <p className="text-xs text-[#889fc4] mt-1">
                        {booking.showtime?.cinema?.name} · {booking.showtime?.room?.roomName}
                      </p>
                    </div>
                    <div className="flex justify-between items-end pt-1">
                      <div className="text-xs text-[#889fc4]">
                        Suất: <span className="text-white font-medium">{booking.showtime?.startTime} · {booking.showtime?.date}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#e8b84b]">
                          {booking.finalAmount.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-[10px] text-green-400 font-semibold mt-0.5">
                          +{points.toLocaleString("vi-VN")} điểm
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-10 h-10 flex items-center justify-center bg-[#0f1d43] border border-[#1c356f] hover:border-[#e8b84b] rounded-lg text-white disabled:opacity-30 disabled:hover:border-[#1c356f] disabled:cursor-not-allowed transition-colors"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-[#889fc4]">
            Trang <span className="text-white">{page}</span> / {data.pagination.totalPages}
          </span>
          <button
            disabled={page === data.pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="w-10 h-10 flex items-center justify-center bg-[#0f1d43] border border-[#1c356f] hover:border-[#e8b84b] rounded-lg text-white disabled:opacity-30 disabled:hover:border-[#1c356f] disabled:cursor-not-allowed transition-colors"
            aria-label="Trang sau"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0a1128] border border-[#1c356f] shadow-2xl flex flex-col max-h-[90vh] text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1c356f] bg-[#0d1835] px-6 py-4">
              <h3 className="text-lg font-bold text-white">Chi tiết vé xem phim</h3>
              <button
                onClick={() => setSelectedBookingId(null)}
                className="rounded-lg p-1.5 text-[#889fc4] hover:bg-[#182d5a] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isDetailLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-10 h-10 text-[#e8b84b] animate-spin" />
                  <p className="text-sm text-[#889fc4]">Đang tải thông tin chi tiết...</p>
                </div>
              ) : !detailData ? (
                <div className="text-center py-12 text-[#889fc4]">
                  Không tìm thấy thông tin chi tiết của vé này.
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Movie Info Section */}
                  <div className="flex flex-col sm:flex-row gap-5 bg-[#0d1835]/50 p-4 rounded-xl border border-[#14264e]">
                    <img
                      src={detailData.showtime?.movie?.posterUrl}
                      alt={detailData.showtime?.movie?.title}
                      className="w-full sm:w-28 h-40 object-cover rounded-lg mx-auto sm:mx-0 shadow-lg border border-[#1c356f]"
                    />
                    <div className="flex-1 flex flex-col justify-between py-1 text-center sm:text-left">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                          {detailData.showtime?.movie?.title}
                        </h4>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-[#889fc4]">
                          <span className="bg-[#182d5a] text-white px-2 py-0.5 rounded font-bold">
                            {detailData.showtime?.movie?.ageRating || "P"}
                          </span>
                          <span>·</span>
                          <span>{detailData.showtime?.movie?.durationMinutes || 120} phút</span>
                          <span>·</span>
                          <span>{detailData.showtime?.room?.roomName}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 space-y-1.5 text-sm text-[#eee]">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <MapPin className="w-4 h-4 text-[#e8b84b] shrink-0" />
                          <span>{detailData.showtime?.room?.cinema?.name}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Clock className="w-4 h-4 text-[#e8b84b] shrink-0" />
                          <span className="font-semibold text-white">
                            {/* Format showtime dynamically */}
                            {(() => {
                              const d = new Date(detailData.showtime?.startTime);
                              const tStr = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Ho_Chi_Minh", hour12: false });
                              const dStr = new Date(detailData.showtime?.showDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" });
                              return `${tStr} · ${dStr}`;
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Code and QR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#0d1835]/30 p-5 rounded-xl border border-[#14264e]">
                    <div className="space-y-4 text-center md:text-left">
                      <div>
                        <div className="text-xs text-[#889fc4] uppercase tracking-wider font-semibold">Mã đặt vé</div>
                        <div className="text-2xl font-mono font-bold text-[#e8b84b] mt-1">{detailData.bookingCode}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#889fc4] uppercase tracking-wider font-semibold">Ngày thanh toán</div>
                        <div className="text-sm text-white mt-1">
                          {new Date(detailData.bookedAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Asia/Ho_Chi_Minh",
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-[#889fc4] uppercase tracking-wider font-semibold">Ghế đã chọn</div>
                        <div className="text-sm font-bold text-white mt-1">
                          {detailData.tickets?.map((t: any) => t.showtimeSeat?.seat?.seatCode).join(", ") || "Chưa chọn"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-[#1c356f] pt-5 md:pt-0 md:pl-5">
                      <div className="bg-white p-2.5 rounded-xl shadow-lg">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${detailData.bookingCode}`}
                          alt="QR Code Vé"
                          className="w-36 h-36"
                        />
                      </div>
                      <p className="text-[11px] text-[#889fc4] mt-2">Đưa mã QR này cho nhân viên soát vé</p>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-[#a5b4fc] text-sm uppercase tracking-wider">Chi tiết thanh toán</h5>
                    <div className="bg-[#0d1835]/20 rounded-xl border border-[#14264e] p-4 divide-y divide-[#14264e] text-sm">
                      {/* Tickets price */}
                      <div className="flex justify-between py-2.5">
                        <span className="text-[#889fc4]">Vé xem phim ({detailData.tickets?.length || 0} vé)</span>
                        <span className="font-semibold">{detailData.totalTicketPrice?.toLocaleString("vi-VN")}đ</span>
                      </div>

                      {/* Combos price */}
                      {detailData.combos && detailData.combos.length > 0 && (
                        <div className="py-2.5 space-y-1.5">
                          <div className="flex justify-between text-[#889fc4] mb-1">
                            <span>Bắp nước / Combo</span>
                            <span className="font-semibold text-white">{(detailData.totalComboPrice || 0).toLocaleString("vi-VN")}đ</span>
                          </div>
                          {detailData.combos.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-xs pl-3 text-[#eee]">
                              <span>{item.combo?.name || "Combo"} (x{item.quantity})</span>
                              <span>{item.totalPrice?.toLocaleString("vi-VN")}đ</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Discount price */}
                      {detailData.discountAmount > 0 && (
                        <div className="flex justify-between py-2.5 text-red-400">
                          <span>Giảm giá / Voucher</span>
                          <span>-{detailData.discountAmount?.toLocaleString("vi-VN")}đ</span>
                        </div>
                      )}

                      {/* Total price */}
                      <div className="flex justify-between py-3 text-base font-bold">
                        <span className="text-white">Tổng số tiền đã trả</span>
                        <span className="text-[#e8b84b]">{detailData.finalAmount?.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#1c356f] bg-[#0d1835] px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedBookingId(null)}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#182d5a] hover:bg-[#1c356f] text-white transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
