"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/layout/admin-sidebar";
import AdminHeader from "@/components/admin/layout/admin-header";

import { useAuthStore } from "@/store/auth.store";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { user, hasHydrated } = useAuthStore();

  useEffect(() => {
    // đợi zustand load localStorage
    if (!hasHydrated) return;

    // chưa login
    if (!user) {
      router.push("/login");
      return;
    }

    // không phải admin
    if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, hasHydrated, router]);

  // tránh flicker
  if (!hasHydrated) {
    return null;
  }

  // tránh render khi chưa auth
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 bg-[#0d0d0d] ">{children}</main>
      </div>
    </div>
  );
}
