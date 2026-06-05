export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  role: "admin" | "customer";
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface UserPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserListResponse {
  success: boolean;
  users: User[];
  pagination: UserPagination;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "customer";
}

export interface UpdateUserInput {
  fullName: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  isActive: boolean;
  isVerified: boolean;
}
