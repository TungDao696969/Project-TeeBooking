import api from "@/lib/axios";
import { ProfileResponse, UpdateProfilePayload } from "@/types/user.type";

export const getProfile = async () => {
  const response = await api.get<ProfileResponse>("/users/profile");

  return response.data.data;
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await api.patch("/users/profile", data);

  return response.data;
};

export const uploadAvatarApi = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await api.patch("/users/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const changePasswordApi = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post("/change-password", data);
  return response.data;
};

