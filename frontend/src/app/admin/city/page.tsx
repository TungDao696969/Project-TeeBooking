"use client";

import { columns } from "@/components/admin/city/city-columns";
import CityTable from "@/components/admin/city/city-table";
import { useCities } from "@/hooks/admin/city/use-cities";
import { Loader2 } from "lucide-react";

export default function CityPage() {
  const { data, isLoading } = useCities();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#E2001A]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-[#0a0a0a] min-h-screen">
      <CityTable columns={columns} data={data ?? []} />
    </div>
  );
}
