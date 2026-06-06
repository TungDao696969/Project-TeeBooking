import { useQuery } from "@tanstack/react-query";

import { getTrashUsersService } from "@/services/admin/user.service";

export const useTrashUsers = () => {
  return useQuery({
    queryKey: ["trash-users"],
    queryFn: getTrashUsersService,
  });
};
