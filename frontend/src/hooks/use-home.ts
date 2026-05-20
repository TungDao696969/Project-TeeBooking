import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/services/home.service";

export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });
};
