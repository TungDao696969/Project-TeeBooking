"use client";

import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import RoomDetail from "@/components/admin/room/room-detail";
import { useRoomDetail } from "@/hooks/admin/room/use-room-detail";

export default function MovieDetailPage() {
  const params = useParams();

  const { data, isLoading } = useRoomDetail(params.id as string);

  if (isLoading || !data) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-10 w-60" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <RoomDetail />
    </div>
  );
}
