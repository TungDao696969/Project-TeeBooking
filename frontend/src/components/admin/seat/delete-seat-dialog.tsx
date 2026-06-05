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

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  onDelete: () => void;
  isPending?: boolean;
}

export default function DeleteSeatDialog({ onDelete, isPending }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 border border-red-900/50 bg-red-950/30
            text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600
            transition-all duration-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="bg-[#111111] border border-white/[0.08] rounded-2xl
          shadow-2xl shadow-black/80 p-0 overflow-hidden max-w-sm"
      >
        {/* Top accent */}
        <div className="h-[3px] bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

        <div className="p-6">
          <AlertDialogHeader className="space-y-3">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className="w-12 h-12 rounded-full bg-red-950/60 border border-red-900/50
                flex items-center justify-center"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
            </div>

            <AlertDialogTitle className="text-white text-center text-lg font-bold tracking-tight">
              Xoá Ghế
            </AlertDialogTitle>

            <AlertDialogDescription className="text-zinc-500 text-center text-sm leading-relaxed">
              Bạn có chắc muốn xoá ghế này không?
              <br />
              <span className="text-red-500/80 text-xs">
                Hành động này không thể hoàn tác.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6 flex gap-2 sm:flex-row flex-col-reverse">
            <AlertDialogCancel
              className="flex-1 bg-white/[0.04] border border-white/10 text-zinc-300
                hover:bg-white/[0.08] hover:text-white hover:border-white/20
                rounded-xl py-2.5 text-sm font-medium transition-all duration-200"
            >
              Huỷ
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onDelete}
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-red-700 to-red-600
                hover:from-red-600 hover:to-red-500
                text-white rounded-xl py-2.5 text-sm font-bold tracking-wide
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-red-900/30
                transition-all duration-200 active:scale-[0.98]"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Đang xoá...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Trash2 className="h-3.5 w-3.5" />
                  Xoá Ghế
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
