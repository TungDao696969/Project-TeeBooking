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
import { Trash2, TriangleAlert } from "lucide-react";
import { useDeleteShowtime } from "@/hooks/admin/showtime/use-delete-showtime";
interface Props {
  id: string;
}
export default function DeleteShowtimeButton({ id }: Props) {
  const mutation = useDeleteShowtime();
  return (
    <AlertDialog>
      {" "}
      {/* Trigger */}{" "}
      <AlertDialogTrigger>
        {" "}
        <Button
          type="button"
          size="icon"
          className=" bg-[#1a1111] border border-red-700 hover:bg-red-700 hover:border-red-600 text-red-500 hover:text-white transition-all duration-200 rounded-xl shadow-lg shadow-red-900/20 "
        >
          {" "}
          <Trash2 className="h-4 w-4" />{" "}
        </Button>{" "}
      </AlertDialogTrigger>
      {/* Dialog */}{" "}
      <AlertDialogContent className=" bg-[#0f0b0b] border border-[#2b1d1d] text-[#f5e6dc] rounded-3xl shadow-2xl shadow-black/50 max-w-md ">
        {" "}
        <AlertDialogHeader className="space-y-4">
          {" "}
          {/* Icon */}{" "}
          <div className="mx-auto w-16 h-16 rounded-full bg-red-950/40 border border-red-800 flex items-center justify-center">
            {" "}
            <TriangleAlert className="w-8 h-8 text-red-500" />{" "}
          </div>{" "}
          {/* Title */}{" "}
          <AlertDialogTitle className=" text-center text-2xl font-semibold tracking-wide text-[#f5e6dc] ">
            {" "}
            Xóa suất chiếu?{" "}
          </AlertDialogTitle>{" "}
          {/* Description */}{" "}
          <AlertDialogDescription className=" text-center text-[#8c7474] leading-relaxed ">
            {" "}
            Hành động này không thể hoàn tác. <br /> Dữ liệu suất chiếu sẽ bị
            xóa vĩnh viễn.{" "}
          </AlertDialogDescription>{" "}
        </AlertDialogHeader>{" "}
        {/* Footer */}{" "}
        <AlertDialogFooter className="mt-6 flex gap-3 sm:justify-center">
          {" "}
          <AlertDialogCancel className=" bg-[#1a1313] border border-[#352626] text-[#f5e6dc] hover:bg-[#241919] hover:text-white rounded-xl h-11 px-6 ">
            {" "}
            Hủy{" "}
          </AlertDialogCancel>{" "}
          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(id)}
            className=" bg-red-700 hover:bg-red-800 text-white rounded-xl h-11 px-6 shadow-lg shadow-red-900/20 transition-all "
          >
            {" "}
            {mutation.isPending ? "Đang xóa..." : "Xóa suất chiếu"}{" "}
          </AlertDialogAction>{" "}
        </AlertDialogFooter>{" "}
      </AlertDialogContent>{" "}
    </AlertDialog>
  );
}
