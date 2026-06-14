"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Banner } from "@/types/admin/banner.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeleteBanner } from "@/hooks/admin/banner/use-delete-banner";
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

function DeleteBannerButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteBanner();

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
          <AlertDialogTitle className="text-white">Delete Banner</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Are you sure you want to delete this banner? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(id)}
            className="bg-[#c8000a] text-white hover:bg-[#a00008]"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const columns: ColumnDef<Banner>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-14 w-24 overflow-hidden rounded-md border border-[#333]">
        {row.original.imageUrl ? (
          <Image
            src={row.original.imageUrl}
            alt={row.original.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs text-zinc-500">
            No image
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-semibold text-white">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "redirectUrl",
    header: "Redirect URL",
    cell: ({ row }) => (
      <span className="block max-w-[160px] truncate text-xs text-[#888]">
        {row.original.redirectUrl || <span className="italic text-zinc-600">—</span>}
      </span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Period",
    cell: ({ row }) => (
      <div className="text-xs text-[#888] space-y-0.5">
        <div>
          <span className="text-zinc-500">From: </span>
          {new Date(row.original.startDate).toLocaleDateString("vi-VN")}
        </div>
        <div>
          <span className="text-zinc-500">To: </span>
          {new Date(row.original.endDate).toLocaleDateString("vi-VN")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-1 text-xs text-[#999]">
        <span
          className={`h-[7px] w-[7px] rounded-full flex-shrink-0 ${
            row.original.isActive ? "bg-green-500" : "bg-[#c8000a]"
          }`}
        />
        {row.original.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-xs text-[#888]">
        {new Date(row.original.createdAt).toLocaleDateString("vi-VN")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Link href={`/admin/banner/${row.original.id}`}>
          <Button
            size="icon"
            className="h-[34px] w-[34px] rounded-lg bg-amber-600 hover:bg-amber-700 border-none text-white"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/admin/banner/${row.original.id}/edit`}>
          <Button
            size="icon"
            className="h-[34px] w-[34px] rounded-lg bg-blue-600 hover:bg-blue-700 border-none text-white"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <DeleteBannerButton id={row.original.id} />
      </div>
    ),
  },
];
