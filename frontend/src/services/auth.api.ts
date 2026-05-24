import api from "@/lib/axios";
import {
  LoginPayload,
  RegisterPayload,
  VerifyOtpBody,
  VerifyOtpResponse,
} from "@/types/auth.type";

export const registerApi = async (body: RegisterPayload) => {
  const res = await api.post("/auth/register", body);
  return res.data;
};
export const loginService = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};
export const verifyOtpApi = async (
  body: VerifyOtpBody,
): Promise<VerifyOtpResponse> => {
  const { data } = await api.post<VerifyOtpResponse>("/auth/verify-otp", body);

  return data;
};
