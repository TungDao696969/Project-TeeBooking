import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { movieAdminService } from "@/services/admin/movie.service";

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieAdminService.updateMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      toast.success("Movie updated successfully");
    },

    onError: () => {
      toast.error("Update failed");
    },
  });
};
