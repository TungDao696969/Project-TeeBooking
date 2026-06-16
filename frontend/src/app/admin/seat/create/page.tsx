"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import SeatForm from "@/components/admin/seat/seat-form";

function CreateSeatContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") ?? undefined;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Create Seat</h1>

      <SeatForm roomId={roomId} />
    </div>
  );
}

export default function CreateSeatPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-8 text-center text-gray-500">
          Loading...
        </div>
      }
    >
      <CreateSeatContent />
    </Suspense>
  );
}
