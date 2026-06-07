import { movieAdminService } from "@/services/admin/movie.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateMovie = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieAdminService.createMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      toast.success("Movie created");

      router.push("/admin/movie");
    },

    onError: () => {
      toast.error("Create failed");
    },
  });
};
