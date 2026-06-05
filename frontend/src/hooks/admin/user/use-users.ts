import { useQuery } from "@tanstack/react-query";

import { getUsersService } from "@/services/admin/user.service";

export const useUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["users", page, limit],

    queryFn: () => getUsersService(page, limit),
  });
};
