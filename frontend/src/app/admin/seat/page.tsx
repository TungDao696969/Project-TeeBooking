"use client";

import { useSeats } from "@/hooks/admin/seat/use-seat";
import { useSeatStore } from "@/store/admin/seat.store";
import { SeatTable } from "@/components/admin/seat/seat-table";
export default function SeatPage() {
  const page = useSeatStore((s) => s.page);
  const setPage = useSeatStore((s) => s.setPage);

  const { data, isLoading } = useSeats(page);

  const { keyword } = useSeatStore();

  const filteredSeats =
    data?.data.filter((seat) =>
      [
        `${seat.seatRow}${seat.seatNumber}`,
        seat.seatCode,
        seat.room.roomName,
        seat.room.cinema.name,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword.toLowerCase()),
    ) || [];

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Seat Management</h1>

        {/* <SeatFilter /> */}
      </div>

      <SeatTable
        data={filteredSeats}
        pagination={data.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
