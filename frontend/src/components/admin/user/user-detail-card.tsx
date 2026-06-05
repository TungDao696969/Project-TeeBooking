"use client";

import Image from "next/image";
import dayjs from "dayjs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { User } from "@/types/admin/user.type";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  user: User;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900/80
        p-4
        backdrop-blur-sm
      "
    >
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="text-sm font-semibold text-white">{value || "-"}</p>
    </div>
  );
}

export default function UserDetailCard({ user }: Props) {
  const router = useRouter();
  return (
    <Card
      className="
        overflow-hidden
        border-red-900/50
        bg-zinc-950
        text-white
        shadow-[0_0_40px_rgba(220,38,38,0.15)]
      "
    >
      {/* Header */}
      <CardHeader
        className="
    border-b
    border-red-900/30
    bg-gradient-to-r
    from-black
    via-zinc-950
    to-black
  "
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle
              className="
          text-2xl
          font-bold
          uppercase
          tracking-[0.2em]
          text-red-500
        "
            >
              User Detail
            </CardTitle>

            <p className="mt-1 text-sm text-zinc-400">
              Thông tin chi tiết người dùng
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/admin/user")}
            className="
        border-red-600
        bg-transparent
        text-red-500
        hover:border-red-500
        hover:bg-red-600
        hover:text-white
      "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.fullName}
                width={160}
                height={160}
                className="
                  rounded-full
                  border-4
                  border-red-600
                  object-cover
                  shadow-[0_0_30px_rgba(239,68,68,0.4)]
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-[160px]
                  w-[160px]
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-red-600
                  bg-zinc-900
                  text-5xl
                  font-bold
                  text-red-500
                  shadow-[0_0_30px_rgba(239,68,68,0.4)]
                "
              >
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
            )}

            <h2 className="mt-5 text-xl font-bold text-white">
              {user.fullName}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">{user.email}</p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Badge
                className="
                  bg-red-600
                  px-3
                  py-1
                  text-white
                  hover:bg-red-600
                "
              >
                {user.role}
              </Badge>

              <Badge
                className={
                  user.isActive
                    ? "bg-green-600 text-white"
                    : "bg-zinc-700 text-white"
                }
              >
                {user.isActive ? "Active" : "Inactive"}
              </Badge>

              <Badge
                className={
                  user.isVerified
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-700 text-white"
                }
              >
                {user.isVerified ? "Verified" : "Pending"}
              </Badge>
            </div>
          </div>

          {/* Information Section */}
          <div className="grid flex-1 gap-4 md:grid-cols-2">
            <InfoItem label="Full Name" value={user.fullName} />

            <InfoItem label="Email" value={user.email} />

            <InfoItem label="Phone Number" value={user.phone} />

            <InfoItem label="Role" value={user.role} />

            <InfoItem
              label="Status"
              value={user.isActive ? "Active" : "Inactive"}
            />

            <InfoItem
              label="Verification"
              value={user.isVerified ? "Verified" : "Pending"}
            />

            <InfoItem
              label="Created At"
              value={dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")}
            />

            <InfoItem label="User ID" value={user.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
