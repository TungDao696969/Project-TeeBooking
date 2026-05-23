"use client";

import { CalendarDays, CircleDollarSign, TicketPercent } from "lucide-react";

import { Promotion } from "@/types/promotion.type";

interface Props {
  promotion: Promotion;
}

const formatCurrency = (value?: number | null) => {
  if (value == null) return "Không giới hạn";

  return `${value.toLocaleString("vi-VN")}đ`;
};

const formatDiscount = (promotion: Promotion) => {
  if (promotion.type === "percentage") {
    return `${promotion.discountValue}%`;
  }

  if (promotion.type === "combo") {
    return "Ưu đãi combo";
  }

  return formatCurrency(promotion.discountValue);
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));

export default function PromotionInfo({ promotion }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B172E] p-8">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Thông tin khuyến mãi
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <TicketPercent className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              Mức giảm giá
            </span>
          </div>

          <div className="text-4xl font-extrabold text-yellow-400">
            {formatDiscount(promotion)}
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <CircleDollarSign className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              Giảm tối đa
            </span>
          </div>

          <div className="text-4xl font-extrabold text-yellow-400">
            {formatCurrency(promotion.maxDiscount)}
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <CircleDollarSign className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              Đơn tối thiểu
            </span>
          </div>

          <div className="text-xl font-bold text-white">
            {formatCurrency(promotion.minOrderValue)}
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              Thời gian áp dụng
            </span>
          </div>

          <div className="text-xl font-bold text-white">
            {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Mô tả</h3>
        <p className="leading-8 text-gray-300">
          {promotion.description || "Chưa có mô tả cho khuyến mãi này."}
        </p>
      </div>
    </div>
  );
}
