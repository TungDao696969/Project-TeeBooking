import { UpdateProfileInput } from "../validations/user.schema";
export declare const getUserProfileService: (userId: string) => Promise<{
    fullName: string;
    email: string;
    phone: string;
    gender: import("../generated/prisma/enums").GenderType | null;
    dateOfBirth: Date | null;
    id: string;
    avatarUrl: string | null;
    role: import("../generated/prisma/enums").UserRole;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateUserProfileService: (userId: string, data: UpdateProfileInput) => Promise<{
    fullName: string;
    email: string;
    phone: string;
    gender: import("../generated/prisma/enums").GenderType | null;
    dateOfBirth: Date | null;
    id: string;
    avatarUrl: string | null;
    role: import("../generated/prisma/enums").UserRole;
    isVerified: boolean;
    isActive: boolean;
    updatedAt: Date;
}>;
export declare const uploadAvatarService: (userId: string, file: Express.Multer.File) => Promise<{
    fullName: string;
    email: string;
    id: string;
    avatarUrl: string | null;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.service.d.ts.map