"use client";

import { useParams } from "next/navigation";

import SeatDetailComponent from "@/components/admin/seat/seat-detail";

import { useSeatById } from "@/hooks/admin/seat/use-seat-detail";

export default function SeatDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading } = useSeatById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Seat not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <SeatDetailComponent seat={data} />
    </div>
  );
}
