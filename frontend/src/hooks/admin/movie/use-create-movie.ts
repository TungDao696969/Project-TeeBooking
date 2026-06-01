import { movieAdminService } from "@/services/admin/movie.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieAdminService.createMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      toast.success("Movie created");
    },

    onError: () => {
      toast.error("Create failed");
    },
  });
};
