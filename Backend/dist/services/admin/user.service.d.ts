import { CreateUserInput } from "../../validations/user.validation";
interface GetUsersOptions {
    page?: number;
    limit?: number;
    search?: string;
}
export declare const createUserService: (data: CreateUserInput) => Promise<{
    email: string;
    id: string;
    createdAt: Date;
    fullName: string;
    phone: string;
    role: import("../../generated/prisma/enums").UserRole;
}>;
export declare const getUsersService: ({ page, limit, search, }: GetUsersOptions) => Promise<any>;
export declare const getUserByIdService: (id: string) => Promise<any>;
export declare const updateUserService: (id: string, data: Partial<CreateUserInput & {
    isActive?: boolean;
    isVerified?: boolean;
}>) => Promise<{
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    fullName: string;
    phone: string;
    gender: import("../../generated/prisma/enums").GenderType | null;
    dateOfBirth: Date | null;
    passwordHash: string;
    avatarUrl: string | null;
    role: import("../../generated/prisma/enums").UserRole;
    verificationCode: string | null;
    resetPasswordCode: string | null;
    resetPasswordExpiresAt: Date | null;
    refreshToken: string | null;
    isVerified: boolean;
}>;
export declare const deleteUserService: (id: string) => Promise<void>;
export declare const getTrashUsersService: () => Promise<any>;
export declare const restoreUserService: (id: string) => Promise<{
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    fullName: string;
    phone: string;
    gender: import("../../generated/prisma/enums").GenderType | null;
    dateOfBirth: Date | null;
    passwordHash: string;
    avatarUrl: string | null;
    role: import("../../generated/prisma/enums").UserRole;
    verificationCode: string | null;
    resetPasswordCode: string | null;
    resetPasswordExpiresAt: Date | null;
    refreshToken: string | null;
    isVerified: boolean;
}>;
export {};
//# sourceMappingURL=user.service.d.ts.map