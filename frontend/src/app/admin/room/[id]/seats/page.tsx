"use client";

import { useParams } from "next/navigation";

import { useSeatsByRoom } from "@/hooks/admin/seat/use-seats-by-room";

import SeatTable from "@/components/admin/seat/roomId/seat-table";
import { SeatTypeConfig } from "@/components/admin/seat/seat-type-config";

export default function SeatsPage() {
  const params = useParams();

  const roomId = params.id as string;

  const { data, isLoading } = useSeatsByRoom(roomId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 overflow-auto">
          <SeatTable seats={data || []} />
        </div>
        <div className="md:col-span-1">
          <SeatTypeConfig roomId={roomId} />
        </div>
      </div>
    </div>
  );
}
