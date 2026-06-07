"use client";

import { CinemaTable } from "@/components/admin/cinema/cinema-table";
import { Button } from "@/components/ui/button";
import { useCinemas } from "@/hooks/admin/cinema/use-cinemas";
import { Clapperboard, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CinemaPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCinemas(page);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#0d0d0d] min-h-screen p-6 rounded-xl">
      <CinemaTable
        data={data.data}
        pagination={data.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
