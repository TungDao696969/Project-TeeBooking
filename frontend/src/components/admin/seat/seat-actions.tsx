"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Seat } from "@/types/admin/seat.type";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteSeat } from "@/hooks/admin/seat/use-delete-seat";
import DeleteSeatDialog from "./delete-seat-dialog";
interface SeatActionsProps {
  seatId: string;
}

export default function SeatActions({ seatId }: SeatActionsProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteSeat();
  const handleDelete = async () => {
    await deleteMutation.mutateAsync(seatId);
  };
  return (
    <div className="flex items-center gap-2">
      {/* Detail */}
      <Link href={`/admin/seat/${seatId}`}>
        <Button
          size="icon"
          variant="outline"
          className="
            border-blue-800
            text-blue-400
            hover:bg-blue-950
            hover:text-white
          "
        >
          <Eye className="h-4 w-4" />
        </Button>
      </Link>

      {/* Edit */}
      <Link href={`/admin/seat/${seatId}/edit`}>
        <Button
          size="icon"
          variant="outline"
          className="
            border-yellow-700
            text-yellow-400
            hover:bg-yellow-950
            hover:text-white
          "
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>

      {/* Delete */}
      <DeleteSeatDialog
        onDelete={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
