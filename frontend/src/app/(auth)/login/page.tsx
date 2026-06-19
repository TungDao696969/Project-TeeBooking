"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

function LoginContent() {
  const searchParams = useSearchParams();
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "register") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, [searchParams]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d28]">
      <div className="relative z-20">
        <Header />

        <div className="min-h-screen bg-[#030B3F] px-4 py-16">
          <div className="mx-auto flex w-full max-w-7xl justify-center">
            <AnimatePresence mode="wait">
              {isRegister ? (
                <motion.div
                  className="w-full max-w-[720px]"
                  key="register"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm setIsRegister={setIsRegister} />
                </motion.div>
              ) : (
                <motion.div
                  className="w-full max-w-[720px]"
                  key="login"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm setIsRegister={setIsRegister} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Footer />
      </div>

      <div className="absolute bottom-0 left-0 h-3 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-500" />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#070d28] text-white">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-400"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
