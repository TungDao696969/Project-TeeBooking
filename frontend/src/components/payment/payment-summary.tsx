"use client";

import { useMemo } from "react";

import { useBookingStore } from "@/store/booking.store";
import { useComboStore } from "@/store/combo.store";

export default function PaymentSummary() {
  const { selectedSeats, tickets, totalPrice } = useBookingStore();

  const { selectedCombos } = useComboStore();

  const ticketTotal = useMemo(() => {
    return tickets.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [tickets]);

  const seatExtraTotal = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => {
      return sum + Number(seat.extraPrice ?? 0);
    }, 0);
  }, [selectedSeats]);

  const comboTotal = useMemo(() => {
    return selectedCombos.reduce((sum, item) => {
      return sum + Number(item.combo.price) * item.quantity;
    }, 0);
  }, [selectedCombos]);

  const total = totalPrice + comboTotal;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-5 text-lg font-semibold text-white">
        Thông tin thanh toán
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-white/70">
          <span>Tiền vé</span>
          <span>{ticketTotal.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between text-white/70">
          <span>Ghế (Phụ thu)</span>
          <span>{seatExtraTotal.toLocaleString()}đ</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-white/70">
            <span>Combo</span>
            <span>{comboTotal.toLocaleString()}đ</span>
          </div>

          {selectedCombos.map((item) => (
            <div
              key={item.combo.id}
              className="flex justify-between pl-3 text-xs text-white/50"
            >
              <span>
                {item.quantity}x {item.combo.name}
              </span>

              <span>
                {(item.combo.price * item.quantity).toLocaleString()}đ
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between font-bold text-yellow-400">
            <span>Tổng tiền</span>

            <span>{total.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
