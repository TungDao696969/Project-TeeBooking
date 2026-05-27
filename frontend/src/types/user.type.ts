export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  gender: "male" | "female";
  dateOfBirth: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UpdateProfilePayload {
  fullName: string;

  phone: string;

  gender: "male" | "female";

  dateOfBirth: string;
}
