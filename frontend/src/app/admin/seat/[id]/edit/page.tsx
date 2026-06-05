"use client";

import { useParams } from "next/navigation";

import SeatForm from "@/components/admin/seat/seat-form";

import { useSeatById } from "@/hooks/admin/seat/use-seat-detail";

import { useUpdateSeat } from "@/hooks/admin/seat/use-update-seat";
import SeatFormUpdate from "@/components/admin/seat/seat-update-form";

export default function EditSeatPage() {
  const params = useParams();

  const seatId = params.id as string;

  const { data, isLoading } = useSeatById(seatId);

  const updateMutation = useUpdateSeat(seatId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SeatFormUpdate
      initialData={data}
      onSubmit={updateMutation.mutateAsync}
      loading={updateMutation.isPending}
    />
  );
}
