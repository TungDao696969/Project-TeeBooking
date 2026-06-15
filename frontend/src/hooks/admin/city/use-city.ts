import { getCityById } from "@/services/admin/city.service";
import { useQuery } from "@tanstack/react-query";

export const useCity = (id: string) => {
  return useQuery({
    queryKey: ["city", id],
    queryFn: () => getCityById(id),
    enabled: !!id,
  });
};
