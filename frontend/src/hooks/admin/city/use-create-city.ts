import { createCity } from "@/services/admin/city.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      toast.success("Thêm thành phố thành công");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi thêm thành phố");
    },
  });
};
