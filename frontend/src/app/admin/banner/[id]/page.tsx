"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useBannerDetail } from "@/hooks/admin/banner/use-banner-detail";
import { useDeleteBanner } from "@/hooks/admin/banner/use-delete-banner";
import {
  ChevronRight,
  LayoutDashboard,
  Pencil,
  Trash2,
  ArrowLeft,
  Calendar,
  Link2,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function BannerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: banner, isLoading } = useBannerDetail(id);
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-[#E2001A]" />
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
        <p className="text-zinc-400">Banner not found</p>
        <Link href="/admin/banner">
          <Button variant="outline" className="border-zinc-700 text-zinc-300">
            Back to list
          </Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteBanner(id, {
      onSuccess: () => router.push("/admin/banner"),
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <LayoutDashboard className="h-4 w-4 text-zinc-500" />
        <span className="text-zinc-500">Admin</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <Link href="/admin/banner" className="text-zinc-500 hover:text-white transition-colors">
          Banners
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <span className="font-medium text-white truncate max-w-[200px]">{banner.title}</span>
      </div>

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="h-1 w-full bg-[#E2001A]" />

        {/* Header */}
        <div className="border-b border-zinc-800 px-7 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{banner.title}</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Banner ID: <span className="font-mono text-zinc-400">{banner.id}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/banner/${id}/edit`}>
                <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-lg border-[#c8000a] text-[#c8000a] bg-transparent hover:bg-[#3d0000]"
                    disabled={isDeleting}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 border-zinc-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete Banner</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      Are you sure you want to delete &quot;{banner.title}&quot;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-[#c8000a] text-white hover:bg-[#a00008]"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-7">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Banner Image - 3/5 */}
            <div className="lg:col-span-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Banner Image
              </p>
              <div className="relative aspect-[16/6] w-full overflow-hidden rounded-xl border border-zinc-700">
                {banner.imageUrl ? (
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
                    No image available
                  </div>
                )}
              </div>
            </div>

            {/* Details - 2/5 */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Status */}
              <div className="rounded-lg border border-zinc-700 bg-zinc-800/40 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  {banner.isActive ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm font-semibold text-emerald-400">Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-semibold text-red-400">Inactive</span>
                    </>
                  )}
                </div>
              </div>

              {/* Redirect URL */}
              <div className="rounded-lg border border-zinc-700 bg-zinc-800/40 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Redirect URL
                </p>
                {banner.redirectUrl ? (
                  <a
                    href={banner.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 break-all"
                  >
                    <Link2 className="h-4 w-4 shrink-0" />
                    {banner.redirectUrl}
                  </a>
                ) : (
                  <p className="text-sm italic text-zinc-600">No redirect URL</p>
                )}
              </div>

              {/* Date Range */}
              <div className="rounded-lg border border-zinc-700 bg-zinc-800/40 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Display Period
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-400">Start:</span>
                    <span className="text-white">
                      {new Date(banner.startDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-400">End:</span>
                    <span className="text-white">
                      {new Date(banner.endDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Created / Updated */}
              <div className="rounded-lg border border-zinc-700 bg-zinc-800/40 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Timestamps
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Created:</span>
                    <span className="text-white">
                      {new Date(banner.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Updated:</span>
                    <span className="text-white">
                      {new Date(banner.updatedAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
