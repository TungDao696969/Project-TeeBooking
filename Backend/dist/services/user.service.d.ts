import { UpdateProfileInput } from "../validations/user.schema";
export declare const getUserProfileService: (userId: string) => Promise<{
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    fullName: string;
    phone: string;
    gender: import("../generated/prisma/enums").GenderType | null;
    dateOfBirth: Date | null;
    avatarUrl: string | null;
    role: import("../generated/prisma/enums").UserRole;
    isVerified: boolean;
}>;
export declare const updateUserProfileService: (userId: string, data: UpdateProfileInput) => Promise<{
    email: string;
    id: string;
    updatedAt: Date;
    isActive: boolean;
    fullName: string;
    phone: string;
    gender: import("../generated/prisma/enums").GenderType | null;
    dateOfBirth: Date | null;
    avatarUrl: string | null;
    role: import("../generated/prisma/enums").UserRole;
    isVerified: boolean;
}>;
export declare const uploadAvatarService: (userId: string, file: Express.Multer.File) => Promise<{
    email: string;
    id: string;
    updatedAt: Date;
    fullName: string;
    avatarUrl: string | null;
}>;
//# sourceMappingURL=user.service.d.ts.map