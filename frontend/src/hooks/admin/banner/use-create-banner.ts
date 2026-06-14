"use client";

import { useMutation } from "@tanstack/react-query";
import { createBanner } from "@/services/admin/banner.service";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateBanner = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBanner,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });

      toast.success("Banner created");

      router.push("/admin/banner");
    },

    onError: () => {
      toast.error("Create failed");
    },
  });
};
