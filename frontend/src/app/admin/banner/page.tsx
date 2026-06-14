"use client";

import { columns } from "@/components/admin/banner/banner-columns";
import BannerTable from "@/components/admin/banner/banner-table";
import { useBanners } from "@/hooks/admin/banner/use-banners";
import { Loader2 } from "lucide-react";

export default function BannerPage() {
  const { data, isLoading } = useBanners();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#E2001A]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-[#0a0a0a] min-h-screen">
      <BannerTable columns={columns} data={data ?? []} />
    </div>
  );
}
