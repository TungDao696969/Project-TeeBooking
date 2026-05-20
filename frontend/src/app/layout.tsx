import "./globals.css";
import QueryProvider from "@/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b1633] text-white min-h-screen">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
