import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { movieAdminService } from "@/services/admin/movie.service";
import { useRouter } from "next/navigation";

export const useUpdateMovie = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieAdminService.updateMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      toast.success("Movie updated successfully");

      router.push("/admin/movie");
    },

    onError: () => {
      toast.error("Update failed");
    },
  });
};
