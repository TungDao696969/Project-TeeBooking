import { updateCity } from "@/services/admin/city.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCity,
    onSuccess: (_, variables) => {
      toast.success("Cập nhật thành phố thành công");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      queryClient.invalidateQueries({ queryKey: ["city", variables.id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật thành phố");
    },
  });
};
