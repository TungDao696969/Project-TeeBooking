// features/cinemas/hooks/use-update-cinema.ts

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { updateCinema } from "@/services/admin/cinema.service";

import { toast } from "sonner";

export const useUpdateCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCinema,

    onSuccess: () => {
      toast.success("Cập nhật rạp thành công");

      queryClient.invalidateQueries({
        queryKey: ["cinemas"],
      });
    },

    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });
};
