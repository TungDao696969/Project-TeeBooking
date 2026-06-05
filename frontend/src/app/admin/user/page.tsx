"use client";

import UserTable from "@/components/admin/user/user-table";

import { useUsers } from "@/hooks/admin/user/use-users";

import { useUserStore } from "@/store/admin/user.store";


export default function UsersPage() {
  const { page, limit, setPage } = useUserStore();

  const { data, isLoading } = useUsers(page, limit);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <UserTable users={data?.users || []} />
      
    </div>
  );
}
