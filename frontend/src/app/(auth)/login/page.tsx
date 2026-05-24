"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d28]">
      <div className="relative z-20">
        <Header />

        <div className="min-h-screen bg-[#030B3F] px-4 py-16">
          <div className="mx-auto flex max-w-7xl justify-center">
            <AnimatePresence mode="wait">
              {isRegister ? (
                <motion.div
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
