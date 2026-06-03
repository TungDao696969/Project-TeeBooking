"use client";

import { useState } from "react";

import { useShowtimes } from "@/hooks/admin/showtime/use-showtimes";
import ShowtimeTable from "@/components/admin/showtime/showtime-table";

export default function ShowtimePage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useShowtimes(page);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Showtime Management</h1>

      <ShowtimeTable
        data={data?.data ?? []}
        pagination={data?.pagination}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
