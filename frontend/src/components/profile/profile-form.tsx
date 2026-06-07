"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { profileSchema, ProfileSchemaType } from "@/schemas/profile.schema";

import { useProfile } from "@/hooks/profile/use-profile";

import { updateProfile, uploadAvatarApi } from "@/services/user.api";

import { Input } from "@/components/ui/input";
import BookingHistory from "./booking-history";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { User, Star, History, LogOut, Camera } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
export default function ProfileForm() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useProfile();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const displayName = user?.fullName || user?.name || user?.email || "User";
  const avatarUrl =
    user?.avatarUrl ||
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`;

  const updateUserAvatar = useAuthStore((state) => state.updateUserAvatar);

  const [activeTab, setActiveTab] = useState<"profile" | "member" | "history">(
    "profile",
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        phone: profile.phone,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",
      });
    }
  }, [profile, reset]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [previewAvatar]);

  const mutation = useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      toast.success("Cập nhật thành công");

      updateUserAvatar(data.data.avatar);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: (data) => {
      toast.success("Thay đổi ảnh đại diện thành công");
      updateUserAvatar(data.data.avatarUrl);
      setPreviewAvatar(null);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: () => {
      toast.error("Thay đổi ảnh đại diện thất bại");
      setPreviewAvatar(null);
    },
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // validate size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ảnh tối đa 5MB");

      return;
    }

    // validate type
    if (!file.type.startsWith("image/")) {
      toast.error("File không hợp lệ");

      return;
    }

    // preview
    const previewUrl = URL.createObjectURL(file);

    setPreviewAvatar(previewUrl);

    uploadAvatarMutation.mutate(file);
  };

  const onSubmit = (data: ProfileSchemaType) => {
    console.log(data);
    // mutation.mutate(data);
    mutation.mutate({
      ...data,

      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    });
  };

  if (isLoading) {
    return <div className="py-20 text-center text-white">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
        {/* SIDEBAR */}
        <div
          className="
            w-full
            lg:w-[340px]
            rounded-xl
            bg-gradient-to-b
            from-[#5B35B0]
            to-[#3B63D1]
            p-6
            shadow-2xl
          "
        >
          <div className="flex items-start gap-4">
            <div className="relative h-24 w-24">
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-full
                  border-4
                  border-white/30
                "
              >
                {previewAvatar ? (
                  <Image
                    src={previewAvatar}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                ) : avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-white/10
                    "
                  >
                    <User className="h-10 w-10 text-white" />
                  </div>
                )}

                {/* overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-black/50
                    opacity-0
                    transition
                    hover:opacity-100
                  "
                >
                  <Camera className="h-6 w-6 text-white" />
                </button>

                {/* loading */}
                {uploadAvatarMutation.isPending && (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/60
                    "
                  >
                    <div
                      className="
                        h-6
                        w-6
                        animate-spin
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                      "
                    />
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                {profile?.fullName}
              </h3>

              <button
                type="button"
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white
                  underline
                "
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
                Thay đổi ảnh đại diện
              </button>
            </div>
          </div>

          <div
            className="
              mt-6
              flex
              h-12
              items-center
              justify-center
              bg-yellow-400
              text-xl
              font-black
              text-black
            "
          >
            Friends
          </div>

          <div className="mt-6">
            <p className="text-xl text-white">
              Tích điểm{" "}
              <span className="font-bold text-yellow-300">Friends</span>
            </p>

            <div className="mt-4 h-2 rounded-full bg-gray-500">
              <div className="h-2 w-0 rounded-full bg-yellow-400"></div>
            </div>

            <p className="mt-3 text-3xl font-bold text-white">
              <span className="text-orange-400">0</span>
              /10K
            </p>
          </div>

          <div className="my-8 border-t border-white/20"></div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`
    flex w-full items-center gap-4 px-4 py-4 text-left text-xl transition
    ${
      activeTab === "profile"
        ? "border-l-4 border-yellow-400 bg-white/5 font-bold text-yellow-300"
        : "text-white hover:bg-white/10"
    }
  `}
            >
              <User className="h-6 w-6" />
              Thông tin khách hàng
            </button>

            <button
              onClick={() => setActiveTab("member")}
              className={`
    flex w-full items-center gap-4 px-4 py-4 text-left text-xl transition
    ${
      activeTab === "member"
        ? "border-l-4 border-yellow-400 bg-white/5 font-bold text-yellow-300"
        : "text-white hover:bg-white/10"
    }
  `}
            >
              <Star className="h-6 w-6" />
              Thành viên Cinestar
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`
    flex w-full items-center gap-4 px-4 py-4 text-left text-xl transition
    ${
      activeTab === "history"
        ? "border-l-4 border-yellow-400 bg-white/5 font-bold text-yellow-300"
        : "text-white hover:bg-white/10"
    }
  `}
            >
              <History className="h-6 w-6" />
              Lịch sử mua hàng
            </button>
          </div>

          <div className="my-8 border-t border-white/20"></div>

          <button
            className="
              flex
              items-center
              gap-3
              text-xl
              text-gray-300
              transition
              hover:text-white
            "
            onClick={logout}
          >
            <LogOut className="h-6 w-6" />
            Đăng xuất
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <>
              <h1
                className="
          text-4xl
          font-black
          uppercase
          text-white
        "
              >
                Thông tin khách hàng
              </h1>

              <div className="mt-8 bg-[#EAEAEA] p-8 lg:p-10">
                <h2 className="text-4xl font-black text-black">
                  Thông tin cá nhân
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  {/* FULL NAME */}
                  <div>
                    <label className="mb-3 block text-xl text-black">
                      Họ và tên
                    </label>

                    <Input
                      {...register("fullName")}
                      className="
                h-16
                rounded-none
                border-black
                bg-transparent
                px-5
                text-xl
                text-black
              "
                    />

                    {errors.fullName && (
                      <p className="mt-2 text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* DATE */}
                  <div>
                    <label className="mb-3 block text-xl text-black">
                      Ngày sinh
                    </label>

                    <Input
                      type="date"
                      {...register("dateOfBirth")}
                      className="
                h-16
                rounded-none
                border-black
                bg-transparent
                px-5
                text-xl
                text-black
              "
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="mb-3 block text-xl text-black">
                      Số điện thoại
                    </label>

                    <Input
                      {...register("phone")}
                      className="
                h-16
                rounded-none
                border-black
                bg-transparent
                px-5
                text-xl
                text-black
              "
                    />

                    {errors.phone && (
                      <p className="mt-2 text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-3 block text-xl text-black">
                      Email
                    </label>

                    <Input
                      value={profile?.email || ""}
                      disabled
                      className="
                h-16
                rounded-none
                border-black
                bg-transparent
                px-5
                text-xl
                text-black
                disabled:opacity-100
              "
                    />
                  </div>

                  {/* BUTTON */}
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="
                mt-4
                h-14
                rounded-md
                bg-[#D9D9D9]
                px-8
                text-xl
                font-black
                uppercase
                text-black
                hover:bg-gray-300
              "
                    >
                      {mutation.isPending ? "Đang lưu..." : "Lưu thông tin"}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}

          {activeTab === "history" && (
            <>
              <h1
                className="
          text-4xl
          font-black
          uppercase
          text-white
        "
              >
                Lịch sử mua hàng
              </h1>

              <div className="mt-8">
                <BookingHistory />
              </div>
            </>
          )}

          {activeTab === "member" && (
            <>
              <h1
                className="
          text-4xl
          font-black
          uppercase
          text-white
        "
              >
                Thành viên Cinestar
              </h1>

              <div className="mt-8 bg-[#EAEAEA] p-8 lg:p-10">
                <h2 className="text-3xl font-black text-black">
                  Thông tin thành viên
                </h2>

                <div className="mt-6 text-lg text-black">
                  Chưa có dữ liệu thành viên.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
