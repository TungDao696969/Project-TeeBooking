"use client";

import TrashUserTable from "@/components/admin/user/trash-user-table";

import { useTrashUsers } from "@/hooks/admin/user/use-trash-users";

export default function TrashUsersPage() {
  const { data, isLoading, error } = useTrashUsers();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load users</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Trash Users</h1>

      <TrashUserTable users={data?.data || []} />
    </div>
  );
}
