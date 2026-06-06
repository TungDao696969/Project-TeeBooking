"use client";

import TrashCinemaRoomTable from "@/components/admin/room/trash-cinema-room-table";

import { useTrashCinemaRooms } from "@/hooks/admin/room/use-trash-cinema-rooms";

export default function TrashCinemaRoomPage() {
  const { data, isLoading } = useTrashCinemaRooms();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <TrashCinemaRoomTable rooms={data?.data || []} />
    </div>
  );
}
