"use client";

import { useParams } from "next/navigation";

import UpdateUserForm from "@/components/admin/user/user-update-form";

import { useUserDetail } from "@/hooks/admin/user/use-user-detail";

import { useUpdateUser } from "@/hooks/admin/user/use-update-user";
import { UpdateUserInput } from "@/types/admin/user.type";

export default function EditUserPage() {
  const params = useParams();

  const id = params.id as string;

  const { data: user, isLoading } = useUserDetail(id);

  const mutation = useUpdateUser();

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (values: UpdateUserInput) => {
    console.log("SUBMIT VALUES:", values);
    await mutation.mutateAsync({
      id,
      data: values,
    });
  };

  return (
    <UpdateUserForm
      initialData={user}
      onSubmit={handleUpdate}
      loading={mutation.isPending}
    />
  );
}
