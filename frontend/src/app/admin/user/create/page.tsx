"use client";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import UserForm from "@/components/admin/user/user-form";

import { useCreateUser } from "@/hooks/admin/user/use-create-user";
import { CreateUserFormData } from "@/schemas/admin/user.schema";

export default function CreateUserPage() {
  const mutation = useCreateUser();

  const handleSubmit = (values: CreateUserFormData) => {
    mutation.mutate(values);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create User</h1>

      <UserForm onSubmit={handleSubmit} loading={mutation.isPending} />
    </div>
  );
}
