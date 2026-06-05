"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserSchema,
  CreateUserFormData,
} from "@/schemas/admin/user.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (values: CreateUserFormData) => void;

  loading?: boolean;
}

export default function UserForm({ onSubmit, loading }: Props) {
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "customer",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-red-900/40 bg-zinc-950 p-8 shadow-[0_0_30px_rgba(220,38,38,0.15)]"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-red-500">CREATE USER</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Quản lý tài khoản hệ thống Cinestar
          </p>
        </div>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Full Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Nguyen Van A"
                  className="
                border-zinc-800
                bg-zinc-900
                text-white
                placeholder:text-zinc-500
                focus:border-red-500
                focus:ring-red-500
              "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Email</FormLabel>

              <FormControl>
                <Input
                  type="email"
                  className="
                border-zinc-800
                bg-zinc-900
                text-white
                focus:border-red-500
              "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Phone</FormLabel>

              <FormControl>
                <Input
                  className="
                border-zinc-800
                bg-zinc-900
                text-white
                focus:border-red-500
              "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  className="
                border-zinc-800
                bg-zinc-900
                text-white
                focus:border-red-500
              "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Role</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="
                border-zinc-800
                bg-zinc-900
                text-white
                focus:border-red-500
              "
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                  <SelectItem value="customer">Customer</SelectItem>

                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="
        h-12
        w-full
        bg-red-600
        text-white
        transition-all
        duration-300
        hover:bg-red-500
        hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]
      "
        >
          {loading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </Form>
  );
}
