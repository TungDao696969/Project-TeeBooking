"use client";

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
import { RotateCcw, Film, CircleCheck } from "lucide-react";
import { useRestoreMovie } from "@/hooks/admin/movie/use-restore-movie";

interface Props {
  movieId: string;
}

export default function RestoreMovieDialog({ movieId }: Props) {
  const { mutate, isPending } = useRestoreMovie();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-[#2a2a2a] bg-transparent text-[#777] transition-colors hover:border-[rgba(200,16,46,0.4)] hover:bg-[rgba(200,16,46,0.06)] hover:text-[#c8102e]">
          <RotateCcw className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[400px] overflow-hidden border border-[#2a2a2a] bg-[#141414] p-0 shadow-[0_0_60px_rgba(255,255,255,0.02)]">
        {/* Green stripe */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#1a6632] via-[#27ae60] to-[#1a6632]" />

        <div className="px-7 pt-7 pb-5">
          <AlertDialogHeader className="text-left">
            {/* Icon */}
            <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[rgba(39,174,96,0.22)] bg-[rgba(39,174,96,0.1)]">
              <Film className="h-5 w-5 text-[#27ae60]" />
            </div>

            <AlertDialogTitle className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[1.5px] text-[#f5f5f5]">
              Khôi phục phim?
            </AlertDialogTitle>

            <AlertDialogDescription className="mt-1.5 text-[13.5px] leading-relaxed text-[#666]">
              Bộ phim sẽ được hiển thị trở lại và khán giả có thể đặt vé.
            </AlertDialogDescription>

            {/* Film strip note */}
            <div className="mt-4 flex items-stretch overflow-hidden rounded">
              <div className="w-3.5 shrink-0 border border-[#222] bg-[#0f0f0f]" />
              <div className="flex flex-1 items-center justify-center gap-1.5 border-y border-[rgba(39,174,96,0.15)] bg-[rgba(39,174,96,0.07)] px-3 py-2">
                <CircleCheck className="h-3.5 w-3.5 shrink-0 text-[#27ae60]" />
                <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[#27ae60]">
                  Dữ liệu suất chiếu được giữ nguyên
                </span>
              </div>
              <div className="w-3.5 shrink-0 border border-[#222] bg-[#0f0f0f]" />
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
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              mutate(movieId);
            }}
            className="flex items-center gap-2 bg-[#1a6632] text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#145227] disabled:opacity-50"
          >
            {isPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                Đang khôi phục...
              </>
            ) : (
              "Khôi phục phim"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
