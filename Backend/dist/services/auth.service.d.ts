import { LoginInput, RegisterInput } from "../validations/auth.validation";
export declare const registerUserService: (data: RegisterInput) => Promise<{
    fullname: string;
    email: string;
    gender: "male" | "female" | "other" | undefined;
    phone: string;
    dateOfBirth: Date | undefined;
}>;
export declare const loginUserService: (data: LoginInput) => Promise<{
    user: {
        id: string;
        fullName: string;
        email: string;
        phone: string;
        role: import("../generated/prisma/enums").UserRole;
        avatarUrl: string | null;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        isVerified: true;
        isActive: true;
    };
    accessToken: string;
    refreshToken: string;
}>;
export declare const forgotPasswordService: (email: string) => Promise<boolean>;
export declare const resetPasswordService: (email: string, otp: string, newPassword: string) => Promise<boolean>;
export declare const changePasswordService: (userId: string, currentPassword: string, newPassword: string) => Promise<boolean>;
//# sourceMappingURL=auth.service.d.ts.map