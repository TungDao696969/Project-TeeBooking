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
import { RotateCcw, UserCheck, CircleCheck } from "lucide-react";
import { useRestoreUser } from "@/hooks/admin/user/use-restore-user";

interface Props {
  userId: string;
}

export default function RestoreUserDialog({ userId }: Props) {
  const { mutate, isPending } = useRestoreUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-[#2a2a2a] bg-transparent text-[#888] transition-colors hover:border-[rgba(200,16,46,0.4)] hover:bg-[rgba(200,16,46,0.06)] hover:text-[#c8102e]">
          <RotateCcw className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="p-0 overflow-hidden border border-[#2a2a2a] bg-[#141414] shadow-[0_0_60px_rgba(255,255,255,0.03)] max-w-[400px]">
        {/* Green stripe */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#1a6632] via-[#27ae60] to-[#1a6632]" />

        <div className="px-7 pt-7 pb-5">
          <AlertDialogHeader className="text-left">
            {/* Icon */}
            <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[rgba(39,174,96,0.25)] bg-[rgba(39,174,96,0.1)]">
              <UserCheck className="h-5 w-5 text-[#27ae60]" />
            </div>

            <AlertDialogTitle className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[1.5px] text-[#f5f5f5]">
              Khôi phục người dùng?
            </AlertDialogTitle>

            <AlertDialogDescription className="mt-1.5 text-[13.5px] leading-relaxed text-[#777]">
              Tài khoản này sẽ được kích hoạt lại và có thể đăng nhập vào hệ
              thống.
            </AlertDialogDescription>

            {/* Info note */}
            <div className="mt-4 flex items-start gap-2 rounded border border-[rgba(39,174,96,0.18)] bg-[rgba(39,174,96,0.07)] px-3 py-2">
              <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27ae60]" />
              <span className="text-xs leading-relaxed text-[#27ae60]">
                Toàn bộ dữ liệu và lịch sử hoạt động sẽ được giữ nguyên.
              </span>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1e1e1e]" />

        <AlertDialogFooter className="flex-row justify-end gap-2.5 bg-[#111] px-7 py-4">
          <AlertDialogCancel className="border border-[#2a2a2a] bg-transparent text-xs font-medium tracking-wide text-[#888] hover:border-[#444] hover:bg-transparent hover:text-[#ccc]">
            Hủy
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              mutate(userId);
            }}
            className="flex items-center gap-2 bg-[#1a6632] text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#145227] disabled:opacity-50"
          >
            {isPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                Đang khôi phục...
              </>
            ) : (
              "Khôi phục"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
