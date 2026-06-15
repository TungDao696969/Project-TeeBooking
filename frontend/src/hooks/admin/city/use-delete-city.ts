import { deleteCity } from "@/services/admin/city.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      toast.success("Xóa thành phố thành công");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi xóa thành phố");
    },
  });
};
