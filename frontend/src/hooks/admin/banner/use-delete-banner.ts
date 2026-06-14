"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBanner } from "@/services/admin/banner.service";
import { toast } from "sonner";

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete banner");
    },
  });
};
