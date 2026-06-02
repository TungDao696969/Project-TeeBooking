import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { deleteCinema } from "@/services/admin/cinema.service";

import { toast } from "sonner";

export const useDeleteCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCinema,

    onSuccess: () => {
      toast.success("Xóa rạp thành công");

      queryClient.invalidateQueries({
        queryKey: ["cinemas"],
      });
    },

    onError: () => {
      toast.error("Xóa thất bại");
    },
  });
};
