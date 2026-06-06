export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}
export interface RegisterPayload {
  fullName: string;

  email: string;

  phone: string;

  password: string;

  gender: "male" | "female";

  dateOfBirth: string;
}

export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  avatarUrl?: string | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  forgotEmail: string;
  setForgotEmail: (email: string) => void;
  setAuthenticated: (value: boolean) => void;

  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateUserAvatar: (avatar: string) => void;
}

export interface VerifyOtpBody {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;

  data: {
    user: User;
    accessToken: string;
  };
}
