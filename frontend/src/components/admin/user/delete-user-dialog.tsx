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
import { Trash2, UserMinus, InfoIcon } from "lucide-react";
import { useDeleteUser } from "@/hooks/admin/user/use-delete-user";

interface Props {
  userId: string;
}

export default function DeleteUserDialog({ userId }: Props) {
  const { mutate, isPending } = useDeleteUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md bg-[#c8102e] text-white hover:bg-[#a00d24] transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="p-0 overflow-hidden border border-[#2a2a2a] bg-[#141414] shadow-[0_0_60px_rgba(200,16,46,0.12)] max-w-[420px]">
        {/* Red stripe on top */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#c8102e] via-[#ff3d5f] to-[#c8102e]" />

        <div className="px-7 pt-7 pb-5">
          <AlertDialogHeader className="text-left">
            {/* Icon */}
            <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(200,16,46,0.3)] bg-[rgba(200,16,46,0.12)]">
              <UserMinus className="h-5 w-5 text-[#c8102e]" />
            </div>

            <AlertDialogTitle className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#f5f5f5]">
              Xóa người dùng
            </AlertDialogTitle>

            <AlertDialogDescription className="mt-1 text-sm leading-relaxed text-[#888]">
              Người dùng sẽ được chuyển vào thùng rác và có thể khôi phục lại
              sau.
            </AlertDialogDescription>

            {/* Info note */}
            <div className="mt-4 flex items-start gap-2 rounded-md border border-[rgba(200,16,46,0.2)] bg-[rgba(200,16,46,0.08)] px-3 py-2">
              <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c8102e]" />
              <span className="text-xs text-[#c8102e]">
                Hành động này có thể hoàn tác trong vòng 30 ngày.
              </span>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#222]" />

        <AlertDialogFooter className="flex-row justify-end gap-2.5 bg-[#111] px-7 py-4">
          <AlertDialogCancel className="border border-[#333] bg-transparent text-xs font-medium uppercase tracking-wide text-[#aaa] hover:border-[#555] hover:bg-transparent hover:text-[#ddd]">
            Hủy
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              mutate(userId);
            }}
            className="flex items-center gap-2 bg-[#c8102e] text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#a00d24] disabled:opacity-50"
          >
            {isPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Đang xóa...
              </>
            ) : (
              "Xóa người dùng"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
