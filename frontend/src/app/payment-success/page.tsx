"use client";

import Link from "next/link";

import { useEffect, Suspense } from "react";

import { CheckCircle2, Ticket, House, Popcorn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useBookingStore } from "@/store/booking.store";
import { useComboStore } from "@/store/combo.store";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const bookingDetailHref = bookingId ? `/booking-detail/${bookingId}` : "/";
  const clearSeats = useBookingStore((state) => state.clearSeats);

  const clearCombos = useComboStore((state) => state.clearCombos);

  useEffect(() => {
    clearSeats();
    clearCombos();
  }, [clearSeats, clearCombos]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06101d] px-4">
      <Card className="w-full max-w-2xl border border-emerald-500/20 bg-white/[0.03] shadow-2xl backdrop-blur">
        <CardContent className="p-8 md:p-10">
          {/* TOP */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 rounded-full bg-emerald-500/10 p-5">
              <CheckCircle2 className="h-20 w-20 text-emerald-400" />
            </div>

            <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              Thanh toán thành công
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Vé xem phim của bạn đã được xác nhận thành công.
              <br />
              Chúc bạn có trải nghiệm xem phim tuyệt vời 🎬
            </p>
          </div>

          {/* INFO */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-yellow-400">
                <Ticket className="h-5 w-5" />

                <span className="font-semibold">Thông tin vé</span>
              </div>

              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Trạng thái</span>

                  <span className="font-medium text-emerald-400">
                    Đã thanh toán
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Phương thức</span>

                  <span>VNPay / MoMo</span>
                </div>

                <div className="flex justify-between">
                  <span>Loại vé</span>

                  <span>Online Ticket</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-pink-400">
                <Popcorn className="h-5 w-5" />

                <span className="font-semibold">Lưu ý</span>
              </div>

              <ul className="space-y-2 text-sm text-white/60">
                <li>• Vui lòng đến trước giờ chiếu 15 phút</li>

                <li>• Xuất trình mã QR tại quầy check-in</li>

                <li>• Không hỗ trợ hoàn vé sau khi thanh toán</li>
              </ul>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 flex-1 bg-yellow-400 font-semibold text-black hover:bg-yellow-300"
            >
              <Link href="/">
                <House className="mr-2 h-4 w-4" />
                Về trang chủ
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href={bookingDetailHref}>
                <Ticket className="mr-2 h-4 w-4" />
                Vé của tôi
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#06101d] text-white">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-400"></div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
