interface CreateBannerInput {
    title: string;
    imageUrl: string;
    redirectUrl?: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
}
export declare const createBannerService: (data: CreateBannerInput) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
}>;
export declare const getAllBannerService: () => Promise<any>;
export declare const getAllBannersAdminService: () => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
}[]>;
export declare const getBannerById: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
} | null>;
export declare const updateBannerService: (id: string, data: Record<string, unknown>) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
}>;
export declare const deleteBannerService: (id: string) => Promise<void>;
export {};
//# sourceMappingURL=banner.service.d.ts.map