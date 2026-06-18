import AuthProvider from "@/providers/auth-provider";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tee Star Cinema - Đặt vé xem phim",
  description: "Hệ thống đặt vé xem phim trực tuyến Tee Star Cinema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${montserrat.className} bg-[#0b1633] text-white min-h-screen`}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
