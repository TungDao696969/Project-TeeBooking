"use client";

import { useParams } from "next/navigation";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import PromotionHero from "@/components/promotion/promotion-hero";
import PromotionInfo from "@/components/promotion/promotion-info";

import { usePromotionDetail } from "@/hooks/promotion/use-promotion-detail";

export default function PromotionDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const { data: promotion, isLoading } = usePromotionDetail(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071226] text-white">
        Loading...
      </div>
    );
  }

  if (!promotion) return null;

  return (
    <div className="min-h-screen bg-[#071226]">
      <Header />

      <PromotionHero promotion={promotion} />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <PromotionInfo promotion={promotion} />
      </section>

      <Footer />
    </div>
  );
}
