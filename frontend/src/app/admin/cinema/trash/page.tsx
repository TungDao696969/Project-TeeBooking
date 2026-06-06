"use client";

import TrashCinemaTable from "@/components/admin/cinema/trash-cinema-table";

import { useTrashCinemas } from "@/hooks/admin/cinema/use-trash-cinemas";

export default function TrashCinemaPage() {
  const { data, isLoading } = useTrashCinemas();

  if (isLoading) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Thùng Rác Rạp</h1>

        <p className="text-zinc-500">Danh sách các rạp đã bị xoá mềm</p>
      </div>

      <TrashCinemaTable cinemas={data?.data ?? []} />
    </div>
  );
}
