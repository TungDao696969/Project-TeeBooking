import api from "@/lib/axios";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
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

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const res = await api.post("/forgot-password", payload);
  return res.data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await api.post("/reset-password", payload);
  return res.data;
};

export const refreshToken = async () => {
  return api.post("/auth/refresh-token");
};
