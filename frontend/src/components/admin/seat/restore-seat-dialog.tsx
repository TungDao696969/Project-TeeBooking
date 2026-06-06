"use client";

import { RotateCcw } from "lucide-react";

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

import { useRestoreSeat } from "@/hooks/admin/seat/use-restore-seat";

interface Props {
  seatId: string;
}

export default function RestoreSeatDialog({ seatId }: Props) {
  const restoreMutation = useRestoreSeat();

  const handleRestore = () => {
    restoreMutation.mutate(seatId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-transparent text-neutral-400 text-xs font-medium transition-all hover:border-red-700 hover:text-red-400 hover:bg-red-950/30">
          <RotateCcw className="w-3.5 h-3.5" />
          Khôi phục
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#111] border border-neutral-800 rounded-2xl shadow-2xl p-0 overflow-hidden max-w-sm">
        {/* Header accent */}
        <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

        <div className="px-6 pt-5 pb-6">
          <AlertDialogHeader className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-red-950 border border-red-800/50 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 text-red-400" />
              </div>
              <AlertDialogTitle
                className="text-white tracking-wide"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "20px",
                }}
              >
                Khôi Phục Ghế?
              </AlertDialogTitle>
            </div>

            <AlertDialogDescription className="text-neutral-500 text-sm leading-relaxed pl-12">
              Ghế sẽ được đưa trở lại danh sách hoạt động và có thể sử dụng bình
              thường.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-2 pt-2 pl-12">
            <AlertDialogCancel className="flex-1 bg-transparent border border-neutral-700 text-neutral-400 text-sm rounded-lg hover:bg-neutral-900 hover:text-neutral-300 hover:border-neutral-600 transition-all">
              Hủy
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleRestore}
              disabled={restoreMutation.isPending}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg border-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {restoreMutation.isPending ? (
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  Đang khôi phục...
                </span>
              ) : (
                "Khôi phục"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
