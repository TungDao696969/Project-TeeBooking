import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { restoreMovieService } from "@/services/admin/movie.service";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
export const useRestoreMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreMovieService,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-movies"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Restore failed");
    },
  });
};
