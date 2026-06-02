import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCinema } from "@/services/admin/cinema.service";

export const useCreateCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCinema,

    onSuccess: () => {
      toast.success("Tạo rạp thành công");

      queryClient.invalidateQueries({
        queryKey: ["cinemas"],
      });
    },

    onError: () => {
      toast.error("Tạo rạp thất bại");
    },
  });
};
