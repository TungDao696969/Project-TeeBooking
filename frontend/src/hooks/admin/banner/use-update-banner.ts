"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBanner } from "@/services/admin/banner.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateBanner = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateBanner({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banner", id] });
      toast.success("Banner updated successfully");
      router.push("/admin/banner");
    },
    onError: () => {
      toast.error("Failed to update banner");
    },
  });
};
