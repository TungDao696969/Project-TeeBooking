"use client";

import { useParams } from "next/navigation";

import { useUserDetail } from "@/hooks/admin/user/use-user-detail";

import UserDetailCard from "@/components/admin/user/user-detail-card";
export default function UserDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const { data: user, isLoading } = useUserDetail(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black p-6">
      <UserDetailCard user={user} />
    </div>
  );
}
