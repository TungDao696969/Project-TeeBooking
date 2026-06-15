"use client";

import { useState } from "react";
import { useRooms } from "@/hooks/admin/room/use-room";
import { RoomTable } from "@/components/admin/room/room-table";
import { useRoomStore } from "@/store/admin/room.store";
import RoomFilter from "@/components/admin/room/room-filter";

export default function RoomPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useRooms(page);

  const keyword = useRoomStore((state) => state.keyword);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const rooms = data?.data ?? [];
  const filteredRooms =
    rooms.filter((room) =>
      [
        room.roomName,
        room.roomType,
        room.screenType,
        room.soundSystem,
        room.cinema?.name ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword.toLowerCase()),
    ) || [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Room Management</h1>

        <RoomFilter />
      </div>

      <RoomTable
        data={filteredRooms}
        pagination={
          data?.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 }
        }
        onPageChange={setPage}
      />
    </div>
  );
}
