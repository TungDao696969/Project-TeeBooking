interface CreatePromotionInput {
    title: string;
    description?: string;
    imageUrl?: string;
    type: "percentage" | "fixed_amount" | "combo";
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
}
export declare const createPromotionService: (data: CreatePromotionInput) => Promise<{
    type: import("../generated/prisma/enums").PromotionType;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    endDate: Date;
    imageUrl: string | null;
    startDate: Date;
    discountValue: number;
    minOrderValue: number | null;
    maxDiscount: number | null;
}>;
export declare const getAllPromotionService: (page?: number, limit?: number) => Promise<any>;
export declare const getPromotionByIdService: (id: string) => Promise<{
    type: import("../generated/prisma/enums").PromotionType;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    endDate: Date;
    imageUrl: string | null;
    startDate: Date;
    discountValue: number;
    minOrderValue: number | null;
    maxDiscount: number | null;
} | null>;
export declare const updatePromotionService: (id: string, data: Partial<CreatePromotionInput>) => Promise<{
    type: import("../generated/prisma/enums").PromotionType;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    endDate: Date;
    imageUrl: string | null;
    startDate: Date;
    discountValue: number;
    minOrderValue: number | null;
    maxDiscount: number | null;
}>;
export declare const deletePromotionService: (id: string) => Promise<void>;
export declare const getActivePromotionService: () => Promise<{
    type: import("../generated/prisma/enums").PromotionType;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    endDate: Date;
    imageUrl: string | null;
    startDate: Date;
    discountValue: number;
    minOrderValue: number | null;
    maxDiscount: number | null;
}[]>;
export {};
//# sourceMappingURL=promotion.service.d.ts.map