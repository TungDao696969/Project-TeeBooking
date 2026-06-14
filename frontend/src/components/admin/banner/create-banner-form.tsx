"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createBannerSchema,
  CreateBannerFormData,
} from "@/schemas/admin/banner.schema";

import { useCreateBanner } from "@/hooks/admin/banner/use-create-banner";

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
  ImagePlus,
  Film,
  Link2,
  X,
  ChevronRight,
  LayoutDashboard,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateBannerForm() {
  const router = useRouter();

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { mutate, isPending } = useCreateBanner();

  const form = useForm<CreateBannerFormData>({
    resolver: zodResolver(createBannerSchema),
    defaultValues: {
      title: "",
      redirectUrl: "",
      startDate: "",
      endDate: "",
      image: "",
      isActive: true as boolean,
    },
  });

  const titleValue = form.watch("title");
  const isActiveValue = form.watch("isActive");

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    form.setValue("image", selected.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    setPreview("");
    form.setValue("image", "");
  };

  const onSubmit = async (values: CreateBannerFormData) => {
    console.log("SUBMIT", values);

    try {
      if (!file) {
        toast.error("Please select banner image");
        return;
      }
      setUploading(true);

      const formData = new FormData();

      formData.append("title", values.title);

      if (values.redirectUrl) {
        formData.append("redirectUrl", values.redirectUrl);
      }

      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("isActive", String(values.isActive ?? true));
      formData.append("image", file);

      mutate(formData, {
        onSettled: () => setUploading(false),
      });
    } catch {
      setUploading(false);
    }
  };

  const isLoading = uploading || isPending;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <LayoutDashboard className="h-4 w-4 text-zinc-500" />
        <span className="text-zinc-500">Admin</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <span className="text-zinc-500">Banners</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <span className="font-medium text-white">Create Banner</span>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        {/* Red accent top bar */}
        <div className="h-1 w-full bg-[#E2001A]" />

        {/* Header */}
        <div className="border-b border-zinc-800 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2001A]">
              <Film className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                Create Banner
              </h1>
              <p className="text-sm text-zinc-500">
                Add a new promotional banner to display on the homepage.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-5">
                {/* Image uploader — 3/5 */}
                <div className="lg:col-span-3 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Banner Image
                    <span className="ml-1 text-[#E2001A]">*</span>
                  </p>

                  <label
                    className="
                      group relative flex h-60 cursor-pointer flex-col
                      items-center justify-center overflow-hidden
                      rounded-xl border-2 border-dashed border-zinc-700
                      bg-zinc-800/50 transition-colors duration-200
                      hover:border-[#E2001A] hover:bg-[#1a0808]
                    "
                  >
                    {preview ? (
                      <>
                        <Image
                          src={preview}
                          alt="preview"
                          fill
                          className="rounded-xl object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black"
                          >
                            <X className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#2a0a0a] transition-transform duration-200 group-hover:scale-110">
                          <ImagePlus className="h-6 w-6 text-[#E2001A]" />
                        </div>
                        <p className="text-sm font-medium text-zinc-300">
                          Click to upload banner
                        </p>
                        <p className="mt-1 text-xs text-zinc-600">
                          Recommended 1920 × 720px &middot; PNG or JPG
                        </p>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChooseFile}
                    />
                  </label>

                  {/* Show validation error for image */}
                  {form.formState.errors.image && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.image.message}
                    </p>
                  )}

                  <p className="text-xs text-zinc-600">
                    Supported formats: PNG, JPG, WEBP — Max size 5 MB
                  </p>
                </div>

                {/* Fields — 2/5 */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                          Title
                          <span className="ml-1 text-[#E2001A]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Summer Sale"
                            maxLength={80}
                            className="
                              h-11 rounded-lg border-zinc-700
                              bg-zinc-800 text-white placeholder:text-zinc-600
                              focus-visible:border-[#E2001A]
                              focus-visible:ring-1 focus-visible:ring-[#E2001A]/30
                            "
                            {...field}
                          />
                        </FormControl>
                        <div className="flex items-center justify-between">
                          <FormMessage className="text-xs" />
                          <span className="ml-auto text-xs text-zinc-600">
                            {field.value?.length ?? 0}/80
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Redirect URL (optional) */}
                  <FormField
                    control={form.control}
                    name="redirectUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                          Redirect URL
                          <span className="ml-1 text-zinc-600">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                            <Input
                              placeholder="https://example.com"
                              className="
                                h-11 rounded-lg border-zinc-700 bg-zinc-800
                                pl-9 text-white placeholder:text-zinc-600
                                focus-visible:border-[#E2001A]
                                focus-visible:ring-1 focus-visible:ring-[#E2001A]/30
                              "
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                          Start Date <span className="text-[#E2001A]">*</span>
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="date"
                            className="h-11 rounded-lg border-zinc-700 bg-zinc-800 text-white focus-visible:border-[#E2001A] focus-visible:ring-1 focus-visible:ring-[#E2001A]/30"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                          End Date <span className="text-[#E2001A]">*</span>
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="date"
                            className="h-11 rounded-lg border-zinc-700 bg-zinc-800 text-white focus-visible:border-[#E2001A] focus-visible:ring-1 focus-visible:ring-[#E2001A]/30"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
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
                            Active
                          </FormLabel>
                          <p className="text-xs text-zinc-500">
                            Display banner immediately
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

                  {/* Live preview card */}
                  <div className="rounded-lg border border-zinc-700 bg-zinc-800/40 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                      Preview
                    </p>
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="relative h-8 w-14 shrink-0 overflow-hidden rounded-md border border-zinc-700 bg-zinc-800">
                        {preview ? (
                          <Image
                            src={preview}
                            alt="thumb"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImagePlus className="h-3.5 w-3.5 text-zinc-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-300">
                          {titleValue || (
                            <span className="italic text-zinc-600">
                              No title yet
                            </span>
                          )}
                        </p>
                        <span
                          className={`text-xs font-medium ${isActiveValue ? "text-emerald-500" : "text-zinc-600"}`}
                        >
                          {isActiveValue ? "● Active" : "○ Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                <p className="text-xs text-zinc-600">
                  Fields marked with <span className="text-[#E2001A]">*</span>{" "}
                  are required
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
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="
                      min-w-[140px] rounded-lg bg-[#E2001A]
                      text-white hover:bg-[#C50016]
                      disabled:cursor-not-allowed disabled:opacity-60
                    "
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Create Banner
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
