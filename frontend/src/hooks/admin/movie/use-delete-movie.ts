import { movieAdminService } from "@/services/admin/movie.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieAdminService.deleteMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      toast.success("Deleted");
    },

    onError: () => {
      toast.error("Delete failed");
    },
  });
};
