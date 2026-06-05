import { useQuery } from "@tanstack/react-query";

import { getUserByIdService } from "@/services/admin/user.service";

export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: ["user", id],

    queryFn: () => getUserByIdService(id),

    enabled: !!id,
  });
};
