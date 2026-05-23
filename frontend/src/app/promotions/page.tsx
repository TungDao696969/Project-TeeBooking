"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { getImageUrl } from "@/lib/image";
import { usePromotions } from "@/hooks/use-promotion";

const formatCurrency = (value: number | null) => {
  if (value == null) return "Không giới hạn";

  return `${value.toLocaleString("vi-VN")}đ`;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));

export default function PromotionPage() {
  const { data: promotions = [], isLoading } = usePromotions();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071226] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071226] text-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#2B1B65] to-[#071226]">
        <div className="mx-auto max-w-[1320px] px-4 py-20">
          <h1 className="text-5xl font-extrabold uppercase text-yellow-400 lg:text-7xl">
            Khuyến mãi
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Cập nhật các chương trình ưu đãi mới nhất tại hệ thống rạp CineStar.
          </p>
        </div>
      </section>

      {/* PROMOTION LIST */}
      <section className="mx-auto max-w-[1320px] space-y-28 px-4 py-16">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className={`
    flex flex-col gap-12
    lg:flex-row lg:items-center lg:justify-between
    ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}
  `}
          >
            {/* IMAGE */}
            <div className="w-full lg:w-[58%] group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
              <Image
                src={getImageUrl(promotion.imageUrl)}
                alt={promotion.title}
                width={720}
                height={420}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full lg:w-[38%] ml-5">
              {/* BADGE */}
              <div className="mb-6 inline-flex rounded-full bg-yellow-400 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black">
                Ưu đãi hot
              </div>

              {/* TITLE */}
              <h2 className="text-4xl font-extrabold uppercase leading-[1.1] text-white lg:text-6xl">
                {promotion.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-7 text-lg leading-9 text-gray-300">
                {promotion.description}
              </p>

              {/* INFO */}
              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2.5 w-2.5 rounded-full bg-yellow-400" />

                  <p className="text-lg leading-8 text-gray-200">
                    Giảm{" "}
                    <span className="font-extrabold text-yellow-400">
                      {promotion.discountValue}%
                    </span>{" "}
                    tối đa{" "}
                    <span className="font-extrabold text-yellow-400">
                      {formatCurrency(promotion.maxDiscount)}
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2.5 w-2.5 rounded-full bg-yellow-400" />

                  <p className="text-lg leading-8 text-gray-200">
                    Áp dụng cho đơn từ{" "}
                    <span className="font-extrabold text-yellow-400">
                      {formatCurrency(promotion.minOrderValue)}
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2.5 w-2.5 rounded-full bg-yellow-400" />

                  <p className="text-lg leading-8 text-gray-200">
                    Thời gian:
                    <span className="ml-2 font-extrabold text-yellow-400">
                      {formatDate(promotion.startDate)}
                    </span>
                    {" - "}
                    <span className="font-extrabold text-yellow-400">
                      {formatDate(promotion.endDate)}
                    </span>
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-3 h-2.5 w-2.5 rounded-full bg-yellow-400" />

                  <p className="text-lg leading-8 text-gray-200">
                    Trạng thái:
                    <span
                      className={`ml-2 font-extrabold ${
                        promotion.isActive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {promotion.isActive ? "Đang hoạt động" : "Đã kết thúc"}
                    </span>
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-12 flex flex-wrap gap-5">
                <Link
                  href={`/promotions/${promotion.id}`}
                  className="inline-flex h-14 items-center justify-center bg-yellow-400 px-10 text-sm font-extrabold uppercase tracking-wide text-black transition hover:scale-105 hover:bg-yellow-300"
                >
                  Xem chi tiết
                </Link>

                <button className="inline-flex h-14 items-center justify-center border border-yellow-400 px-10 text-sm font-extrabold uppercase tracking-wide text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
                  Đặt vé ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
