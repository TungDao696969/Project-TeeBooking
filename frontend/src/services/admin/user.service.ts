import api from "@/lib/axios";
import {
  CreateUserInput,
  UpdateUserInput,
  UserListResponse,
} from "@/types/admin/user.type";

export const getUsersService = async (
  page = 1,
  limit = 10,
): Promise<UserListResponse> => {
  const { data } = await api.get("/user", {
    params: {
      page,
      limit,
    },
  });

  return data;
};

export const createUserService = async (data: CreateUserInput) => {
  const response = await api.post("/user", data);

  return response.data;
};

export const getUserByIdService = async (id: string) => {
  const response = await api.get(`/user/${id}`);

  return response.data.data;
};

export const updateUserService = async (id: string, data: UpdateUserInput) => {
  const response = await api.patch(`/user/${id}`, data);

  return response.data;
};
