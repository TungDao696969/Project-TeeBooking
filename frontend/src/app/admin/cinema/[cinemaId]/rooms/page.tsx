"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { RoomTable } from "@/components/admin/room/cinemaId/room-table";

import RoomFilter from "@/components/admin/room/room-filter";

import { useRoomsByCinema } from "@/hooks/admin/room/use-rooms-by-cinema";

import { useRoomStore } from "@/store/admin/room.store";

export default function RoomPage() {
  const params = useParams();

  const cinemaId = params.cinemaId as string;

  const [page, setPage] = useState(1);

  const keyword = useRoomStore((state) => state.keyword);

  const { data, isLoading } = useRoomsByCinema(cinemaId, page);

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const rooms = data?.data ?? [];

  const filteredRooms = rooms.filter((room) =>
    [room.roomName, room.roomType, room.screenType, room.soundSystem]
      .join(" ")
      .toLowerCase()
      .includes(keyword.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cinema Rooms</h1>

        {/* <RoomFilter /> */}
      </div>

      {/* TABLE */}
      <RoomTable
        cinemaId={cinemaId}
        data={filteredRooms}
        pagination={
          data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        onPageChange={setPage}
      />
    </div>
  );
}
