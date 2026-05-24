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
  role: string;
  avatar?: string;
  avatarUrl?: string | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export interface VerifyOtpBody {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}
