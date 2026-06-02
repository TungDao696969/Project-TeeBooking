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
import { useDeleteCinema } from "@/hooks/admin/cinema/use-delete-cinema";

interface Props {
  cinemaId: string;
  cinemaName: string;
}

export function DeleteCinemaDialog({ cinemaId, cinemaName }: Props) {
  const deleteMutation = useDeleteCinema();

  const handleDelete = () => {
    deleteMutation.mutate(cinemaId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 bg-[#1e1e1e] hover:bg-[#2a1515] hover:text-[#E31E24] text-zinc-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-0 shadow-[0_0_0_1px_rgba(227,30,36,0.08)] max-w-[380px] py-2 px-4">
        <AlertDialogHeader className="px-7 pt-7 pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E31E24]/10 shrink-0">
              <Trash2 className="h-[18px] w-[18px] text-[#E31E24]" />
            </div>
            <AlertDialogTitle className="text-[17px] font-semibold text-zinc-100">
              Xác nhận xóa
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-sm text-zinc-500 leading-relaxed pl-12">
            Bạn có chắc muốn xóa rạp{" "}
            <span className="text-zinc-200 font-medium">{cinemaName}</span>?
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="px-7 py-5 flex gap-2.5">
          <AlertDialogCancel className="flex-1 bg-transparent border border-[#333] text-zinc-400 hover:bg-[#1e1e1e] hover:text-zinc-200 hover:border-[#444] rounded-lg text-sm font-medium transition-colors">
            Hủy
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex-1 bg-[#E31E24] hover:bg-[#c91a1f] text-white border-0 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa rạp"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
