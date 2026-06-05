"use client";

import { useSearchParams } from "next/navigation";

import SeatForm from "@/components/admin/seat/seat-form";

export default function CreateSeatPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") ?? undefined;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Create Seat</h1>

      <SeatForm roomId={roomId} />
    </div>
  );
}
