"use client";

import { useAdminBookingDetail } from "@/hooks/admin/booking/use-booking";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, CreditCard, Ticket, Popcorn, Clock, MapPin,
  User as UserIcon, XCircle, RefreshCw, AlertTriangle, CheckCircle2,
} from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookingStatus } from "@/types/admin/booking.type";
import { updateAdminBookingStatus, adminCancelBooking } from "@/services/admin/booking.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// ── Allowed transitions per status ──────────────────────────────
const TRANSITIONS: Record<string, { label: string; value: BookingStatus }[]> = {
  pending:   [{ label: "✅ Xác nhận (confirmed)", value: "confirmed" }],
  confirmed: [{ label: "🎬 Hoàn thành (completed)", value: "completed" }],
  completed: [{ label: "💸 Hoàn tiền (refunded)", value: "refunded" }],
  cancelled: [{ label: "💸 Hoàn tiền (refunded)", value: "refunded" }],
  refunded:  [],
};

const STATUS_STYLES: Record<string, string> = {
  PENDING:   "bg-yellow-950/60 text-yellow-500 border border-yellow-900/40",
  CONFIRMED: "bg-green-950/60 text-green-400 border border-green-900/50",
  COMPLETED: "bg-blue-950/60 text-blue-400 border border-blue-900/50",
  CANCELLED: "bg-red-950/60 text-red-400 border border-red-900/50",
  REFUNDED:  "bg-orange-950/60 text-orange-400 border border-orange-900/50",
  PAID:      "bg-teal-950/60 text-teal-400 border border-teal-900/50",
  FAILED:    "bg-red-950/60 text-red-400 border border-red-900/50",
};

const STATUS_VI: Record<string, string> = {
  pending:   "Chờ thanh toán",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã huỷ",
  refunded:  "Đã hoàn tiền",
  paid:      "Đã thanh toán",
  failed:    "Thất bại",
};

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status.toUpperCase()] ?? "bg-zinc-800 text-zinc-400 border border-zinc-700";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${cls}`}>
      {STATUS_VI[status.toLowerCase()] ?? status}
    </span>
  );
}

// ── Cancel Confirmation Modal ────────────────────────────────────
function CancelModal({
  open,
  hasPaidPayment,
  loading,
  onClose,
  onConfirm,
}: {
  open: boolean;
  hasPaidPayment: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (refund: boolean) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 p-6 shadow-2xl space-y-5 mx-4"
        style={{ background: "#0d0d0f" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-900/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Huỷ đơn đặt vé</h3>
            <p className="text-sm text-zinc-400">Hành động này không thể hoàn tác.</p>
          </div>
        </div>

        <p className="text-sm text-zinc-300">
          Bạn có chắc muốn huỷ đơn này? Ghế ngồi sẽ được <strong className="text-white">giải phóng tự động</strong>.
        </p>

        {hasPaidPayment && (
          <div className="p-4 rounded-xl bg-orange-950/30 border border-orange-900/40 text-sm text-orange-300 space-y-1">
            <p className="font-semibold">⚠️ Đơn này đã được thanh toán.</p>
            <p>Bạn có muốn hoàn tiền cho khách hàng không?</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 justify-end pt-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            Không, giữ lại
          </Button>
          {hasPaidPayment ? (
            <>
              <Button disabled={loading} onClick={() => onConfirm(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                {loading ? "Đang xử lý..." : "Huỷ, không hoàn tiền"}
              </Button>
              <Button disabled={loading} onClick={() => onConfirm(true)}
                className="bg-red-700 hover:bg-red-600 text-white">
                {loading ? "Đang xử lý..." : "Huỷ & Hoàn tiền"}
              </Button>
            </>
          ) : (
            <Button disabled={loading} onClick={() => onConfirm(false)}
              className="bg-red-700 hover:bg-red-600 text-white">
              {loading ? "Đang xử lý..." : "Xác nhận huỷ"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const bookingId = params.id as string;

  const { data, isLoading, isError } = useAdminBookingDetail(bookingId);
  const [actionLoading, setActionLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  if (isLoading) {
    return <div className="p-8 text-center text-zinc-400">Đang tải chi tiết đặt vé...</div>;
  }
  if (isError || !data?.data) {
    return <div className="p-8 text-center text-red-400">Không tìm thấy thông tin đặt vé.</div>;
  }

  const booking = data.data;
  const hasPaidPayment = booking.payments.some((p) => p.status === "paid");
  const transitions = TRANSITIONS[booking.status] ?? [];
  const canCancel = !["cancelled", "refunded", "completed"].includes(booking.status);

  const handleStatusChange = async () => {
    if (!selectedStatus) return;
    setActionLoading(true);
    try {
      await updateAdminBookingStatus(bookingId, selectedStatus as BookingStatus);
      toast.success(`Cập nhật trạng thái thành công: ${STATUS_VI[selectedStatus]}`);
      setSelectedStatus("");
      queryClient.invalidateQueries({ queryKey: ["admin-booking-detail", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async (refund: boolean) => {
    setActionLoading(true);
    try {
      await adminCancelBooking(bookingId, refund);
      toast.success(refund ? "Đã huỷ đơn và hoàn tiền thành công" : "Đã huỷ đơn thành công");
      setCancelOpen(false);
      queryClient.invalidateQueries({ queryKey: ["admin-booking-detail", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Huỷ đơn thất bại");
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  return (
    <>
      <CancelModal
        open={cancelOpen}
        hasPaidPayment={hasPaidPayment}
        loading={actionLoading}
        onClose={() => setCancelOpen(false)}
        onConfirm={handleCancel}
      />

      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        {/* ── Page Header ── */}
        <div className="flex flex-wrap items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/booking")}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold flex flex-wrap items-center gap-3">
              Chi tiết vé
              <span className="text-yellow-500 uppercase font-mono">#{booking.bookingCode}</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              Đặt lúc: {dayjs(booking.bookedAt).format("HH:mm — DD/MM/YYYY")}
            </p>
          </div>

          {/* Status + actions */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={booking.status} />

            {/* Transition selector */}
            {transitions.length > 0 && (
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={actionLoading}
                  className="h-8 text-xs rounded-lg border border-yellow-900/40 bg-[#1a1710] text-yellow-400 px-2 focus:outline-none focus:border-yellow-500/60 cursor-pointer"
                >
                  <option value="">Chọn trạng thái...</option>
                  {transitions.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <Button
                  size="sm"
                  disabled={!selectedStatus || actionLoading}
                  onClick={handleStatusChange}
                  className="h-8 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold disabled:opacity-40"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {actionLoading ? "Đang xử lý..." : "Áp dụng"}
                </Button>
              </div>
            )}

            {/* Cancel button */}
            {canCancel && (
              <Button
                size="sm"
                disabled={actionLoading}
                onClick={() => setCancelOpen(true)}
                className="h-8 bg-transparent border border-red-900/50 text-red-400 hover:bg-red-950/50 hover:border-red-500 hover:text-red-300"
              >
                <XCircle className="w-3.5 h-3.5 mr-1.5" />
                Huỷ đơn
              </Button>
            )}
          </div>
        </div>

        {/* ── Status timeline hint ── */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
          <RefreshCw className="w-3.5 h-3.5 shrink-0" />
          <span>
            Luồng trạng thái:&nbsp;
            <span className="text-yellow-600">pending</span> →&nbsp;
            <span className="text-green-600">confirmed</span> →&nbsp;
            <span className="text-blue-500">completed</span> →&nbsp;
            <span className="text-orange-500">refunded</span>
            &nbsp;|&nbsp;
            <span className="text-red-500">cancelled</span> →&nbsp;
            <span className="text-orange-500">refunded</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ── Left column ── */}
          <div className="md:col-span-2 space-y-6">
            {/* Showtime card */}
            <div className="bg-[#0d0d0f] rounded-2xl border border-zinc-800/60 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800/60 bg-[#111009]">
                <h2 className="text-base font-bold text-[#c9a84c] flex items-center gap-2 tracking-widest uppercase">
                  <Ticket className="w-4 h-4" /> Thông tin suất chiếu
                </h2>
              </div>
              <div className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-[100px] aspect-[2/3] relative rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                  <Image
                    src={booking.showtime.movie.posterUrl || "https://placehold.co/100x150/111009/c9a84c?text=Poster"}
                    alt={booking.showtime.movie.title}
                    fill className="object-cover"
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl font-bold text-white">{booking.showtime.movie.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-yellow-500 shrink-0" />
                      {booking.showtime.room.cinema.name} — {booking.showtime.room.roomName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                      {dayjs(booking.showtime.startTime).format("HH:mm — DD/MM/YYYY")}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <div className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">
                      Ghế ngồi ({booking.tickets.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {booking.tickets.map((ticket) => (
                        <span key={ticket.id}
                          className="px-2.5 py-1 rounded-lg bg-zinc-800 text-white font-mono text-sm border border-zinc-700">
                          {ticket.showtimeSeat.seat.seatRow}{ticket.showtimeSeat.seat.seatNumber}
                          <span className="ml-1 text-zinc-500 text-xs">
                            {ticket.showtimeSeat.seat.seatType}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Combos card */}
            {booking.combos.length > 0 && (
              <div className="bg-[#0d0d0f] rounded-2xl border border-zinc-800/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800/60 bg-[#111009]">
                  <h2 className="text-base font-bold text-[#c9a84c] flex items-center gap-2 tracking-widest uppercase">
                    <Popcorn className="w-4 h-4" /> Bắp nước ({booking.combos.length})
                  </h2>
                </div>
                <div className="p-6 space-y-3">
                  {booking.combos.map((combo) => (
                    <div key={combo.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 relative rounded bg-zinc-800 overflow-hidden shrink-0">
                          {combo.combo.imageUrl
                            ? <Image src={combo.combo.imageUrl} alt={combo.combo.name} fill className="object-cover" />
                            : <Popcorn className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-600" />
                          }
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm">{combo.combo.name}</div>
                          <div className="text-xs text-zinc-400">x{combo.quantity}</div>
                        </div>
                      </div>
                      <div className="font-semibold text-white text-sm">{formatCurrency(combo.totalPrice)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div className="space-y-6">
            {/* Customer */}
            <div className="bg-[#0d0d0f] rounded-2xl border border-zinc-800/60 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800/60 bg-[#111009]">
                <h2 className="text-base font-bold text-[#c9a84c] flex items-center gap-2 tracking-widest uppercase">
                  <UserIcon className="w-4 h-4" /> Khách hàng
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden relative shrink-0">
                    {booking.user.avatarUrl
                      ? <Image src={booking.user.avatarUrl} alt={booking.user.fullName} fill className="object-cover" />
                      : <UserIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-500" />
                    }
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{booking.user.fullName}</div>
                    <div className="text-xs text-zinc-400 truncate">{booking.user.email}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-zinc-800 grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-zinc-500">SĐT:</span>
                  <span className="text-white">{booking.user.phone || "—"}</span>
                </div>
                <Link href={`/admin/user/${booking.user.id}`} className="block">
                  <Button variant="outline" className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm">
                    Xem hồ sơ
                  </Button>
                </Link>
              </div>
            </div>

            {/* Payment summary */}
            <div className="bg-[#0d0d0f] rounded-2xl border border-zinc-800/60 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800/60 bg-[#111009]">
                <h2 className="text-base font-bold text-[#c9a84c] flex items-center gap-2 tracking-widest uppercase">
                  <CreditCard className="w-4 h-4" /> Thanh toán
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tiền vé ({booking.tickets.length})</span>
                    <span className="text-white">{formatCurrency(booking.totalTicketPrice)}</span>
                  </div>
                  {booking.totalComboPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Bắp nước</span>
                      <span className="text-white">{formatCurrency(booking.totalComboPrice)}</span>
                    </div>
                  )}
                  {booking.discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Giảm giá</span>
                      <span className="text-red-400">-{formatCurrency(booking.discountAmount)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-zinc-800 flex justify-between font-bold text-base">
                    <span className="text-white">Tổng cộng</span>
                    <span className="text-yellow-500">{formatCurrency(booking.finalAmount)}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Lịch sử giao dịch</div>
                  {booking.payments.length === 0 ? (
                    <div className="text-sm text-zinc-500 text-center py-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                      Chưa có giao dịch
                    </div>
                  ) : (
                    booking.payments.map((payment) => (
                      <div key={payment.id}
                        className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-xs space-y-1.5">
                        <div className="flex justify-between font-medium">
                          <span className="text-white uppercase">{payment.paymentMethod}</span>
                          <span className="text-white">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500">{dayjs(payment.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                          <StatusBadge status={payment.status} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
