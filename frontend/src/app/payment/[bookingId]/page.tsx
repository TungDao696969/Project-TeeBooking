"use client";

import { useParams, useRouter } from "next/navigation";
import { useCreatePayment } from "@/hooks/payment/use-create-payment";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import PaymentWatcher from "@/components/payment/payment-watcher";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useBooking } from "@/hooks/booking/use-booking";
import BookingMovie from "@/components/booking/booking-detail/booking-movie";
import BookingSeats from "@/components/booking/booking-detail/booking-seats";
import BookingCombos from "@/components/booking/booking-detail/booking-combos";
import BookingSummary from "@/components/booking/booking-detail/booking-summary";
export default function PaymentPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const router = useRouter();

  const paymentMutation = useCreatePayment();

  const [timeLeft, setTimeLeft] = useState("05:00");
  const { data: booking, isLoading } = useBooking(bookingId);
  useEffect(() => {
    paymentMutation.mutate(bookingId);
  }, [bookingId]);

  const payment = paymentMutation.data;

  useEffect(() => {
    if (!payment?.expiresAt) return;

    const calculateTime = () => {
      const difference = new Date(payment.expiresAt).getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft("00:00");
        return;
      }

      const minutes = Math.floor(difference / 1000 / 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [payment?.expiresAt]);

  useEffect(() => {
    if (timeLeft === "00:00") {
      toast.error("Thời gian thanh toán đã hết");
      router.replace("/");
    }
  }, [timeLeft, router]);

  if (paymentMutation.isPending) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-sm">
            Đang tải thông tin thanh toán...
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!booking || !payment) {
    return null;
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#0a0a0f] py-10 px-4">
        <div className="max-w-7xl mx-auto rounded-2xl border border-white/[0.08] bg-[#13131a] overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a0a0a] border-b border-red-900/30 px-6 py-4 flex items-center gap-3">
            <span className="bg-red-600 text-white text-xs font-medium px-2.5 py-1 rounded tracking-widest">
              CINESTAR
            </span>
            <span className="text-white/80 text-sm font-medium">
              Xác nhận thanh toán
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <BookingMovie showtime={booking.showtime} />

                <BookingSeats tickets={booking.tickets} />

                <BookingCombos combos={booking.combos} />

                <BookingSummary booking={booking} />
              </div>
            </div>
            {/* RIGHT */}
            <div>
              <div className="p-6 space-y-5">
                {/* Timer */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center justify-center gap-1">
                  <span className="text-yellow-500/80 text-xs">
                    Thời gian còn lại
                  </span>
                  <span className="text-yellow-400 text-2xl font-bold font-mono tracking-wider">
                    {timeLeft}
                  </span>
                </div>

                {/* QR Code */}
                <div className="bg-[#1e1e28] border border-white/[0.08] rounded-xl p-5 flex flex-col items-center gap-3">
                  <Image
                    src={payment.qrUrl}
                    alt="QR thanh toán"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                  <span className="inline-flex items-center gap-1.5 bg-red-950 border border-red-800/40 text-red-400 text-xs px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                    Chờ thanh toán
                  </span>
                  <p className="text-white/30 text-xs text-center">
                    Quét mã QR bằng ứng dụng ngân hàng để thanh toán
                  </p>
                </div>

                <hr className="border-white/[0.06]" />

                {/* Order Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white/40 text-sm">Mã đơn</span>
                    <span className="text-violet-400 font-mono text-xs">
                      {payment.bookingCode}
                    </span>
                  </div>
                </div>

                <hr className="border-white/[0.06]" />

                {/* Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Tổng tiền</span>
                  <span className="text-red-500 text-xl font-semibold">
                    {payment.amount.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <PaymentWatcher bookingId={bookingId} />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-6 py-3 text-center">
              <p className="text-white/20 text-xs">
                Giao dịch được bảo mật bởi Cinestar • Hỗ trợ: 1900 6227
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
