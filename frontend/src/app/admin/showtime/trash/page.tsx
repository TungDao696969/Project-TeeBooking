"use client";

import TrashShowtimeTable from "@/components/admin/showtime/trash-showtime-table";

import { useTrashShowtimes } from "@/hooks/admin/showtime/use-trash-showtimes";

export default function TrashShowtimePage() {
  const { data, isLoading } = useTrashShowtimes();

  if (isLoading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Thùng rác suất chiếu</h1>

        <p className="text-muted-foreground">
          Danh sách các suất chiếu đã bị xóa mềm
        </p>
      </div>

      <TrashShowtimeTable showtimes={data?.data ?? []} />
    </div>
  );
}
