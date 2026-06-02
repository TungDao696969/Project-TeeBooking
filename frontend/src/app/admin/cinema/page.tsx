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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E31E24] rounded-lg flex items-center justify-center">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bebas text-3xl tracking-widest text-white leading-none">
              Quản lý rạp chiếu phim
            </h1>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5">
              Hệ thống Cinestar - Admin Portal
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/cinema/create">
            <Plus className="mr-2 h-4 w-4" />
            Thêm rạp
          </Link>
        </Button>
      </div>

      <CinemaTable
        data={data.data}
        pagination={data.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
