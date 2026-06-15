"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { ICity } from "@/types/city.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeleteCity } from "@/hooks/admin/city/use-delete-city";
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

function DeleteCityButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteCity();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className="h-[34px] w-[34px] rounded-lg bg-transparent border border-[#c8000a] text-[#c8000a] hover:bg-[#3d0000]"
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900 border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Xóa thành phố</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Bạn có chắc chắn muốn xóa thành phố này? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(id)}
            className="bg-[#c8000a] text-white hover:bg-[#a00008]"
          >
            {isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const columns: ColumnDef<ICity>[] = [
  {
    accessorKey: "name",
    header: "Tên thành phố",
    cell: ({ row }) => (
      <span className="font-semibold text-white">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <span className="text-xs text-[#888]">
        {row.original.slug}
      </span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-1 text-xs text-[#999]">
        <span
          className={`h-[7px] w-[7px] rounded-full flex-shrink-0 ${
            row.original.isActive ? "bg-green-500" : "bg-[#c8000a]"
          }`}
        />
        {row.original.isActive ? "Hoạt động" : "Bảo trì"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="text-xs text-[#888]">
        {new Date(row.original.createdAt).toLocaleDateString("vi-VN")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Link href={`/admin/city/${row.original.id}`}>
          <Button
            size="icon"
            className="h-[34px] w-[34px] rounded-lg bg-blue-600 hover:bg-blue-700 border-none text-white"
            title="Chỉnh sửa"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <DeleteCityButton id={row.original.id} />
      </div>
    ),
  },
];
