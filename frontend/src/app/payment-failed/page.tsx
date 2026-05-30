"use client";

import Link from "next/link";

import { XCircle, RefreshCcw, House } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06101d] px-4">
      <Card className="w-full max-w-lg border border-red-500/20 bg-white/[0.03] shadow-2xl backdrop-blur">
        <CardContent className="flex flex-col items-center p-10 text-center">
          {/* Icon */}
          <div className="mb-6 rounded-full bg-red-500/10 p-5">
            <XCircle className="h-20 w-20 text-red-500" />
          </div>

          {/* Title */}
          <h1 className="mb-3 text-3xl font-bold text-white">
            Thanh toán thất bại
          </h1>

          {/* Description */}
          <p className="mb-8 text-sm leading-relaxed text-white/60">
            Giao dịch của bạn chưa được hoàn tất hoặc đã bị hủy.
            <br />
            Vui lòng kiểm tra lại thông tin thanh toán và thử lại.
          </p>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
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
              <Link href="/payment">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Thử lại
              </Link>
            </Button>
          </div>

          {/* Extra info */}
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-white/40">
            Nếu bạn đã bị trừ tiền nhưng chưa nhận vé, vui lòng liên hệ hỗ trợ
            khách hàng.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
