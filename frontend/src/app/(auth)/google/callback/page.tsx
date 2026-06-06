"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/auth.type";

type JwtPayload = {
  userId?: string;
  sub?: string;
};

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const payload = useMemo(
    () => (token ? decodeJwtPayload(token) : null),
    [token],
  );
  const userId = searchParams.get("id") || payload?.userId || payload?.sub;
  const email = searchParams.get("email") || "";
  const fullName =
    searchParams.get("fullName") || searchParams.get("name") || "Google User";
  const roleParam = searchParams.get("role");
  const role: User["role"] = roleParam === "admin" ? "admin" : "user";
  const avatarUrl =
    searchParams.get("avatarUrl") ||
    searchParams.get("picture") ||
    searchParams.get("avatar") ||
    "";

  const message = !token
    ? "Dang nhap Google that bai: thieu token."
    : !userId
      ? "Dang nhap Google that bai: token khong hop le."
      : "Dang dang nhap bang Google...";

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (!userId) {
      router.replace("/login");
      return;
    }

    const user: User = {
      id: userId,
      fullName,
      email,
      role,
      avatarUrl,
    };

    setAuth(user, token);

    if (role === "admin") {
      router.replace("/admin/dashboard");
      return;
    }

    router.replace("/");
  }, [avatarUrl, email, fullName, role, router, setAuth, token, userId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1633] px-4 text-white">
      <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-5 text-center shadow-xl">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0b1633] text-white">
          Dang dang nhap bang Google...
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
