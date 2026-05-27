import { useMutation, useQuery } from "@tanstack/react-query";

import { getProfile, uploadAvatarApi } from "@/services/user.api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: uploadAvatarApi,
  });
};
