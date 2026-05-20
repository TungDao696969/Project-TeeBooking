"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          {/* Heading */}
          <div>
            <h2 className="text-2xl font-black uppercase italic text-white md:text-5xl">
              Liên Hệ Với
            </h2>

            <h2 className="text-2xl font-black uppercase italic text-yellow-400 md:text-5xl">
              Chúng Tôi
            </h2>
          </div>

          {/* Facebook */}
          <Link
            href="https://facebook.com"
            target="_blank"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1877F2] to-[#5B4BDB] p-6 transition duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-5">
              {/* Icon */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12 fill-[#1877F2]"
                >
                  <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.99A10 10 0 0022 12z" />
                </svg>
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-medium uppercase tracking-[4px] text-white/70">
                  Theo Dõi Chúng Tôi
                </p>

                <h3 className="text-3xl font-black uppercase text-white">
                  Facebook
                </h3>
              </div>
            </div>
          </Link>

          {/* Zalo */}
          <Link
            href="https://zalo.me"
            target="_blank"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5B3FD4] to-[#9D5CFF] p-6 transition duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between gap-5">
              {/* Left */}
              <div>
                <p className="text-sm font-medium uppercase tracking-[4px] text-white/70">
                  Hỗ Trợ Nhanh
                </p>

                <h3 className="text-3xl font-black uppercase text-white">
                  Zalo Chat
                </h3>
              </div>

              {/* Icon */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl">
                <span className="text-2xl font-black italic text-[#0068FF]">
                  Zalo
                </span>

                <div className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
                  <MessageCircle className="h-4 w-4 text-black" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="rounded-3xl bg-[#2A40C8] p-6 md:p-8">
          {/* Heading */}
          <div className="mb-6">
            <h3 className="text-2xl font-black uppercase text-white">
              Thông Tin Liên Hệ
            </h3>

            <p className="mt-2 text-sm text-white/70">
              Nếu bạn có góp ý hoặc cần hỗ trợ, hãy liên hệ với chúng tôi.
            </p>
          </div>

          {/* Info */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                <Mail className="h-5 w-5 text-black" />
              </div>

              <span className="text-sm md:text-base">
                cskh@cinestar.com.vn
              </span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                <Phone className="h-5 w-5 text-black" />
              </div>

              <span className="text-sm md:text-base">1900 0085</span>
            </div>

            <div className="flex items-start gap-3 text-white">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400">
                <MapPin className="h-5 w-5 text-black" />
              </div>

              <span className="text-sm leading-relaxed md:text-base">
                135 Hai Bà Trưng, phường Sài Gòn, TP.HCM
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleChange}
              className="h-12 rounded-xl border-0 bg-white text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
            />

            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="h-12 rounded-xl border-0 bg-white text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
            />

            <Textarea
              name="message"
              placeholder="Thông tin liên hệ hoặc phản ánh..."
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="resize-none rounded-xl border-0 bg-white text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
            />

            <Button
              onClick={handleSubmit}
              className="h-12 w-full rounded-xl bg-yellow-400 text-base font-black uppercase tracking-widest text-black hover:bg-yellow-300"
            >
              Gửi Ngay
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}