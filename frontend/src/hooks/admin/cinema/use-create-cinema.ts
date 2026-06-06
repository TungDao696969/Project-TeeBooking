import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCinema } from "@/services/admin/cinema.service";

export const useCreateCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCinema,

    onSuccess: async () => {
      toast.success("Tạo rạp thành công");

      await queryClient.invalidateQueries({
        queryKey: ["cinemas"],
        exact: false,
      });
    },

    onError: () => {
      toast.error("Tạo rạp thất bại");
    },
  });
};
