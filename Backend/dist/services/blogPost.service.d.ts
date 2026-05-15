import { CreateBlogInput, UpdateBlogInput } from "../validations/blogPost.validation";
export declare const createBlogPostService: (data: CreateBlogInput) => Promise<{
    author: {
        fullName: string;
        email: string;
        phone: string;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        id: string;
        passwordHash: string;
        avatarUrl: string | null;
        role: import("../generated/prisma/enums").UserRole;
        verificationCode: string | null;
        resetPasswordCode: string | null;
        resetPasswordExpiresAt: Date | null;
        refreshToken: string | null;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string | null;
    authorId: string;
    publishedAt: Date | null;
}>;
export declare const getAllBlogPostsService: () => Promise<any>;
export declare const getBlogPostByIdService: (id: string) => Promise<({
    author: {
        fullName: string;
        email: string;
        phone: string;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        id: string;
        passwordHash: string;
        avatarUrl: string | null;
        role: import("../generated/prisma/enums").UserRole;
        verificationCode: string | null;
        resetPasswordCode: string | null;
        resetPasswordExpiresAt: Date | null;
        refreshToken: string | null;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string | null;
    authorId: string;
    publishedAt: Date | null;
}) | null>;
export declare const getBlogPostBySlugService: (slug: string) => Promise<({
    author: {
        fullName: string;
        email: string;
        phone: string;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        id: string;
        passwordHash: string;
        avatarUrl: string | null;
        role: import("../generated/prisma/enums").UserRole;
        verificationCode: string | null;
        resetPasswordCode: string | null;
        resetPasswordExpiresAt: Date | null;
        refreshToken: string | null;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string | null;
    authorId: string;
    publishedAt: Date | null;
}) | null>;
export declare const updateBlogPostService: (id: string, data: UpdateBlogInput) => Promise<{
    author: {
        fullName: string;
        email: string;
        phone: string;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        id: string;
        passwordHash: string;
        avatarUrl: string | null;
        role: import("../generated/prisma/enums").UserRole;
        verificationCode: string | null;
        resetPasswordCode: string | null;
        resetPasswordExpiresAt: Date | null;
        refreshToken: string | null;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl: string | null;
    authorId: string;
    publishedAt: Date | null;
}>;
export declare const deleteBlogPostService: (id: string) => Promise<boolean>;
//# sourceMappingURL=blogPost.service.d.ts.map