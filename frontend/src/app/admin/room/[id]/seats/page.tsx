"use client";

import { useParams } from "next/navigation";

import { useSeatsByRoom } from "@/hooks/admin/seat/use-seats-by-room";

import SeatTable from "@/components/admin/seat/roomId/seat-table";

export default function SeatsPage() {
  const params = useParams();

  const roomId = params.id as string;

  const { data, isLoading } = useSeatsByRoom(roomId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <SeatTable seats={data || []} />
    </div>
  );
}
