import { Suspense } from "react";

import VerifyOtpForm from "@/components/auth/verify-otp-form";

export default function VerifyOtpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030B3F] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyOtpForm />
        </Suspense>
      </div>
    </main>
  );
}
