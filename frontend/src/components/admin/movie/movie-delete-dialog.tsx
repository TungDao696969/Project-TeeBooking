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
import { Trash2, AlertTriangle } from "lucide-react";
import { useDeleteMovie } from "@/hooks/admin/movie/use-delete-movie";

interface Props {
  movieId: string;
}

export default function DeleteMovieDialog({ movieId }: Props) {
  const { mutate, isPending } = useDeleteMovie();

  return (
    <AlertDialog>
      {/* Trigger */}
      <AlertDialogTrigger asChild>
        <button
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg
            
             hover:border-red-600/50
            transition-all duration-150"
          title="Xoá phim"
        >
          <Trash2 size={15} />
        </button>
      </AlertDialogTrigger>

      {/* Dialog */}
      <AlertDialogContent
        className="p-0 gap-0 overflow-hidden max-w-[380px]
          bg-[#1a1a26] border border-red-600/25
          rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
      >
        {/* Header stripe */}
        <AlertDialogHeader
          className="flex-row items-start gap-3.5 px-6 py-5
            bg-gradient-to-r from-red-600/15 to-red-600/5
            border-b border-red-600/20 space-y-0"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
            bg-red-600/15 border border-red-600/30"
          >
            <Trash2 size={20} className="text-red-400" />
          </div>
          <div>
            <AlertDialogTitle className="text-[15px] font-semibold text-white leading-snug">
              Xác nhận xoá phim?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Phim sẽ bị xoá vĩnh viễn khỏi hệ thống Cinestar và không thể khôi
              phục.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {/* Notice box */}
        <div className="px-6 py-4">
          <div
            className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl
            bg-red-600/7 border border-red-600/20"
          >
            <AlertTriangle
              size={14}
              className="text-red-400 flex-shrink-0 mt-0.5"
            />
            <p className="text-[12px] leading-relaxed text-red-300/75">
              Tất cả dữ liệu liên quan — lịch chiếu, vé đã đặt và đánh giá —
              cũng sẽ bị xoá theo.
            </p>
          </div>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="flex flex-row justify-end gap-2 px-6 pb-5 pt-1">
          <AlertDialogCancel
            className="px-4 py-2 text-sm text-zinc-400 bg-transparent
              border border-yellow-500/20 rounded-lg
              hover:border-yellow-500/40 hover:text-white
              transition-colors h-auto"
          >
            Huỷ bỏ
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={() => mutate(movieId)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium
              bg-red-600 hover:bg-red-700 text-white rounded-lg
              border-0 transition-colors disabled:opacity-50 h-auto
              focus-visible:ring-red-500"
          >
            {isPending ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                Đang xoá...
              </>
            ) : (
              <>
                <Trash2 size={13} />
                Xoá phim
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
