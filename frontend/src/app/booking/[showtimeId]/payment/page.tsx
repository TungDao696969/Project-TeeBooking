"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, useWatch } from "react-hook-form";

import { useParams } from "next/navigation";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import PaymentMethods from "@/components/payment/payment-methods";
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

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (values: PaymentSchema) => {
    if (!showtimeId) return;

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

    try {
      if (values.paymentMethod === "vnpay") {
        const response = await vnpayMutation.mutateAsync(payload);

        window.location.href = response.paymentUrl;

        return;
      }

      const response = await momoMutation.mutateAsync(payload);

      window.location.href = response.payUrl;
    } catch (error) {
      console.log(error);
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
              onChange={(value) =>
                form.setValue("paymentMethod", value as "vnpay" | "momo")
              }
            />

            <VoucherForm
              value={form.watch("voucherCode") || ""}
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
