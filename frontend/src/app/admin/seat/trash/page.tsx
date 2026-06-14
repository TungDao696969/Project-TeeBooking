"use client";

import { useState } from "react";

import TrashSeatTable from "@/components/admin/seat/trash-seat-table";

import { useTrashSeats } from "@/hooks/admin/seat/use-trash-seat";

export default function TrashSeatPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTrashSeats(page, 10);

  if (isLoading || !data) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <TrashSeatTable
        seats={data?.data || []}
        page={1}
        totalPages={1}
        onPageChange={setPage}
      />
    </div>
  );
}
