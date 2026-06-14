"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useBookingStatus } from "@/hooks/booking/use-booking-status";

interface Props {
  bookingId: string;
}

export default function PaymentWatcher({ bookingId }: Props) {
  const router = useRouter();

  const { data } = useBookingStatus(bookingId);

  useEffect(() => {
    if (data?.status === "confirmed" || data?.status === "CONFIRMED") {
      router.push(`/payment-success?bookingId=${bookingId}`);
    } else if (data?.status === "cancelled" || data?.status === "CANCELLED") {
      toast.error("Thời gian thanh toán đã hết, đơn hàng đã bị hủy");
      router.push(`/`);
    }
  }, [data, bookingId, router]);

  return null;
}
