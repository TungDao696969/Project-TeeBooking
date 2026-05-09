import { RegisterInput } from "../validations/auth.validation";
export declare const registerUserService: (data: RegisterInput) => Promise<{
    user: {
        name: string;
        email: string;
        phone: string | null;
        country: string | null;
        language: string | null;
        id: string;
        role: import("../generated/prisma/enums").UserRole;
        createdAt: Date;
    };
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map