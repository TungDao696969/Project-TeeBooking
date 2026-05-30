"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, useWatch } from "react-hook-form";

import { useParams } from "next/navigation";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import PaymentMethods from "@/components/payment/payment-methods";
import PaymentQRCode from "@/components/payment/payment-qr";
import PaymentSummary from "@/components/payment/payment-summary";
import VoucherForm from "@/components/voucher/voucher-form";

import { paymentSchema, PaymentSchema } from "@/schemas/payment.schema";

import { useBookingStore } from "@/store/booking.store";
import { useComboStore } from "@/store/combo.store";

import { useCreateVNPay } from "@/hooks/payment/use-create-vnpay";
import { useCreateMoMo } from "@/hooks/payment/use-create-momo";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PaymentPage() {
  const params = useParams();

  const showtimeId = Array.isArray(params.showtimeId)
    ? params.showtimeId[0]
    : params.showtimeId;

  const { selectedSeats, tickets } = useBookingStore();

  const { selectedCombos } = useComboStore();

  const vnpayMutation = useCreateVNPay();

  const momoMutation = useCreateMoMo();

  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),

    defaultValues: {
      paymentMethod: "vnpay",
      voucherCode: "",
    },
  });

  const [momoPayUrl, setMomoPayUrl] = useState<string | null>(null);

  const paymentMethod =
    (useWatch({
      control: form.control,
      name: "paymentMethod",
    }) as "vnpay" | "momo") ?? "vnpay";

  const voucherCode =
    (useWatch({
      control: form.control,
      name: "voucherCode",
    }) as string) ?? "";

  const handlePaymentMethodChange = (value: "vnpay" | "momo") => {
    setMomoPayUrl(null);
    form.setValue("paymentMethod", value);
  };

  const onSubmit = async (values: PaymentSchema) => {
    if (!showtimeId) return;

    setMomoPayUrl(null);

    const payload = {
      showtimeId,

      voucherCode: values.voucherCode,

      seats: selectedSeats.map((seat) => ({
        seatId: seat.seatId,
      })),

      combos: selectedCombos.map((item) => ({
        comboId: item.combo.id,
        quantity: item.quantity,
      })),

      tickets: tickets.map((ticket) => ({
        ticketTypeId: ticket.ticketTypeId,
        quantity: ticket.quantity,
      })),
    };

    console.log("[PAYMENT_SUBMIT] start", {
      showtimeId,
      paymentMethod: values.paymentMethod,
      voucherCode: values.voucherCode,
      selectedSeats: selectedSeats.map((seat) => ({
        id: seat.id,
        seatId: seat.seatId,
        seatCode: seat.seatCode,
      })),
      selectedCombos: selectedCombos.map((item) => ({
        comboId: item.combo.id,
        name: item.combo.name,
        quantity: item.quantity,
      })),
      tickets: tickets.map((ticket) => ({
        ticketTypeId: ticket.ticketTypeId,
        quantity: ticket.quantity,
      })),
      payload,
    });

    try {
      if (values.paymentMethod === "vnpay") {
        const response = await vnpayMutation.mutateAsync(payload);

        console.log("[PAYMENT_SUBMIT] vnpay response", response);

        window.location.assign(response.paymentUrl);

        return;
      }

      const response = await momoMutation.mutateAsync(payload);

      console.log("[PAYMENT_SUBMIT] momo response", response);

      setMomoPayUrl(response.payUrl);
    } catch (error) {
      console.error("[PAYMENT_SUBMIT] error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#06101d]">
      <Header />

      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-10 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Thanh toán</h1>

            <p className="text-sm text-white/50">
              Hoàn tất thanh toán để nhận vé xem phim
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PaymentMethods
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            />

            <VoucherForm
              value={voucherCode}
              onChange={(value) => form.setValue("voucherCode", value)}
            />

            <Button
              disabled={vnpayMutation.isPending || momoMutation.isPending}
              type="submit"
              className="h-12 w-full bg-yellow-400 text-base font-bold text-black hover:bg-yellow-300"
            >
              {vnpayMutation.isPending || momoMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "THANH TOÁN"
              )}
            </Button>
          </form>

          {paymentMethod === "momo" && momoPayUrl ? (
            <div className="mt-6 space-y-4">
              <PaymentQRCode value={momoPayUrl} />

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4 text-sm text-white/70">
                <p className="mb-2 font-semibold text-white">
                  Hướng dẫn thanh toán MoMo
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Mở app MoMo trên điện thoại.</li>
                  <li>Chọn chức năng quét mã QR.</li>
                  <li>Quét mã QR hiển thị và xác nhận thanh toán.</li>
                </ol>
                <p className="mt-3 text-xs text-white/60">
                  Nếu không quét được, bạn có thể nhấn nút bên dưới để mở đường
                  dẫn MoMo.
                </p>
                <a
                  href={momoPayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full justify-center rounded-xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
                >
                  Mở MoMo
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-24">
            <PaymentSummary />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
