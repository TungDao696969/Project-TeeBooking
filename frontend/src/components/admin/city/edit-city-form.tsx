"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  citySchema,
  CityFormValues,
} from "@/schemas/admin/city.schema";

import { useUpdateCity } from "@/hooks/admin/city/use-update-city";
import { useCity } from "@/hooks/admin/city/use-city";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  ChevronRight,
  LayoutDashboard,
  Loader2,
  Check,
  MapPin,
} from "lucide-react";

export default function EditCityForm({ id }: { id: string }) {
  const router = useRouter();

  const { data: city, isLoading: isFetching } = useCity(id);
  const { mutate, isPending } = useUpdateCity();

  const form = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (city) {
      form.reset({
        name: city.name,
        slug: city.slug,
        isActive: city.isActive,
      });
    }
  }, [city, form]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("name", value);
    form.setValue("slug", generateSlug(value), { shouldValidate: true });
  };

  const onSubmit = (values: CityFormValues) => {
    mutate(
      { id, payload: values },
      {
        onSuccess: () => {
          router.push("/admin/city");
        },
      }
    );
  };

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-[#E2001A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <LayoutDashboard className="h-4 w-4 text-zinc-500" />
        <span className="text-zinc-500">Admin</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <span className="text-zinc-500">Thành phố</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <span className="font-medium text-white">Chỉnh sửa thành phố</span>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 max-w-3xl">
        {/* Red accent top bar */}
        <div className="h-1 w-full bg-[#E2001A]" />

        {/* Header */}
        <div className="border-b border-zinc-800 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2001A]">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                Chỉnh sửa thành phố
              </h1>
              <p className="text-sm text-zinc-500">
                Cập nhật thông tin thành phố trong hệ thống.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-5">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        Tên thành phố
                        <span className="ml-1 text-[#E2001A]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hồ Chí Minh"
                          className="
                            h-11 rounded-lg border-zinc-700
                            bg-zinc-800 text-white placeholder:text-zinc-600
                            focus-visible:border-[#E2001A]
                            focus-visible:ring-1 focus-visible:ring-[#E2001A]/30
                          "
                          {...field}
                          onChange={onNameChange}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        Slug
                        <span className="ml-1 text-[#E2001A]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ho-chi-minh"
                          className="
                            h-11 rounded-lg border-zinc-700
                            bg-zinc-800 text-white placeholder:text-zinc-600
                            focus-visible:border-[#E2001A]
                            focus-visible:ring-1 focus-visible:ring-[#E2001A]/30
                          "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Active toggle */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
                      <div>
                        <FormLabel className="text-sm font-semibold text-zinc-200">
                          Hoạt động
                        </FormLabel>
                        <p className="text-xs text-zinc-500">
                          Hiển thị thành phố này trên hệ thống
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#E2001A]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                <p className="text-xs text-zinc-600">
                  Các trường có <span className="text-[#E2001A]">*</span>{" "}
                  là bắt buộc
                </p>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="
                      rounded-lg border-zinc-700 bg-transparent
                      text-zinc-400 hover:border-zinc-600
                      hover:bg-zinc-800 hover:text-zinc-200
                    "
                  >
                    Hủy
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="
                      min-w-[140px] rounded-lg bg-[#E2001A]
                      text-white hover:bg-[#C50016]
                      disabled:cursor-not-allowed disabled:opacity-60
                    "
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang cập nhật...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Cập nhật
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
