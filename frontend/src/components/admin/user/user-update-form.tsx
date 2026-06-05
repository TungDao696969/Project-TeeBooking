"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  updateUserSchema,
  UpdateUserFormData,
} from "@/schemas/admin/user.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

interface Props {
  initialData: {
    fullName: string;
    email: string;
    phone: string;
    role: "admin" | "customer";
    isActive: boolean;
    isVerified: boolean;
  };

  onSubmit: (values: UpdateUserFormData) => Promise<void>;

  loading?: boolean;
}

export default function UpdateUserForm({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const router = useRouter();
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "customer",
      isActive: true,
      isVerified: true,
    },
  });

  useEffect(() => {
    form.reset({
      fullName: initialData.fullName,

      email: initialData.email,

      phone: initialData.phone,

      role: initialData.role,

      isActive: initialData.isActive,

      isVerified: initialData.isVerified,
    });
  }, [initialData, form]);

  return (
    <Card
      className="
      border-red-900/50
      bg-zinc-950
      text-white
      shadow-[0_0_40px_rgba(220,38,38,0.15)]
    "
    >
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
              Update User
            </CardTitle>

            <p className="mt-2 text-sm text-zinc-400">
              Chỉnh sửa thông tin tài khoản hệ thống
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="
            border-red-600
            bg-transparent
            text-red-500
            hover:bg-red-600
            hover:text-white
          "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay về
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Full Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      className="
                      border-zinc-800
                      bg-zinc-900
                      text-white
                      focus-visible:border-red-500
                    "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Email</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="
                      border-zinc-800
                      bg-zinc-900
                      text-zinc-400
                    "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Phone</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      className="
                      border-zinc-800
                      bg-zinc-900
                      text-white
                      focus-visible:border-red-500
                    "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Role</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="
                      border-zinc-800
                      bg-zinc-900
                      text-white
                    "
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent
                      className="
                      border-zinc-800
                      bg-zinc-900
                      text-white
                    "
                    >
                      <SelectItem value="customer">Customer</SelectItem>

                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem
                  className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900
                  p-4
                "
                >
                  <div>
                    <p className="font-medium text-white">Active User</p>

                    <p className="text-sm text-zinc-500">
                      Cho phép người dùng sử dụng hệ thống
                    </p>
                  </div>

                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            {/* Verified */}
            <FormField
              control={form.control}
              name="isVerified"
              render={({ field }) => (
                <FormItem
                  className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900
                  p-4
                "
                >
                  <div>
                    <p className="font-medium text-white">Verified Account</p>

                    <p className="text-sm text-zinc-500">
                      Xác minh email người dùng
                    </p>
                  </div>

                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
              hover:bg-red-500
              hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]
            "
            >
              <Save className="mr-2 h-4 w-4" />

              {loading ? "Updating..." : "Update User"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
