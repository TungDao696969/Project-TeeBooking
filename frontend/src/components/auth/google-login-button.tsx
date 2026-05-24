"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLoginButton() {
  const handleLoginGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      type="button"
      className="flex h-12 items-center gap-2 rounded-md border border-gray-300 bg-white px-6 text-base font-semibold text-black hover:bg-gray-50"
      onClick={handleLoginGoogle}
    >
      <FaGoogle className="size-5 text-[#EA4335]" aria-hidden="true" />
      Đăng nhập bằng Google
    </Button>
  );
}
