import { getCities } from "@/services/admin/city.service";
import { useQuery } from "@tanstack/react-query";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
};
