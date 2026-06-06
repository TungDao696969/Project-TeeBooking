"use client";

import { RotateCcw, Armchair, CircleCheck } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRestoreCinemaRoom } from "@/hooks/admin/room/use-restore-cinema-room";

interface Props {
  roomId: string;
}

export default function RestoreCinemaRoomDialog({ roomId }: Props) {
  const restoreMutation = useRestoreCinemaRoom();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-[#2a2a2a] bg-transparent px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#777] transition-colors hover:border-[rgba(200,16,46,0.4)] hover:bg-[rgba(200,16,46,0.06)] hover:text-[#c8102e]">
          <RotateCcw className="h-3 w-3" />
          Khôi phục
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[410px] overflow-hidden border border-[#2a2a2a] bg-[#141414] p-0 shadow-[0_0_60px_rgba(255,255,255,0.02)]">
        {/* Green stripe */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#1a6632] via-[#27ae60] to-[#1a6632]" />

        <div className="px-7 pt-7 pb-5">
          <AlertDialogHeader className="text-left">
            {/* Icon */}
            <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[rgba(39,174,96,0.22)] bg-[rgba(39,174,96,0.1)]">
              <Armchair className="h-5 w-5 text-[#27ae60]" />
            </div>

            <AlertDialogTitle className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[1.5px] text-[#f5f5f5]">
              Khôi phục phòng chiếu?
            </AlertDialogTitle>

            <AlertDialogDescription className="mt-1.5 text-[13.5px] leading-relaxed text-[#666]">
              Phòng chiếu sẽ được đưa trở lại hệ thống và có thể sử dụng bình
              thường.
            </AlertDialogDescription>

            {/* Seat grid note */}
            <div className="mt-4 flex items-center gap-3 rounded border border-[rgba(39,174,96,0.15)] bg-[rgba(39,174,96,0.06)] px-3.5 py-2.5">
              {/* Mini seat grid */}
              <div className="grid shrink-0 grid-cols-4 gap-[3px]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-[1.5px] ${
                      i < 8 ? "bg-[#27ae60]" : "bg-[#27ae60] opacity-30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold leading-relaxed tracking-[0.5px] text-[#27ae60]">
                Cấu hình ghế và lịch chiếu
                <br />
                được giữ nguyên sau khi khôi phục.
              </p>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1e1e1e]" />

        <AlertDialogFooter className="flex-row justify-end gap-2.5 bg-[#111] px-7 py-4">
          <AlertDialogCancel className="border border-[#2a2a2a] bg-transparent text-xs font-medium tracking-wide text-[#777] hover:border-[#444] hover:bg-transparent hover:text-[#ccc]">
            Hủy
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => restoreMutation.mutate(roomId)}
            disabled={restoreMutation.isPending}
            className="flex items-center gap-2 bg-[#1a6632] text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#145227] disabled:opacity-50"
          >
            {restoreMutation.isPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                Đang khôi phục...
              </>
            ) : (
              "Khôi phục phòng"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
