interface CreateBannerInput {
    title: string;
    imageUrl: string;
    redirectUrl?: string;
    startDate: Date;
    endDate: Date;
}
export declare const createBannerService: (data: CreateBannerInput) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
}>;
export declare const getAllBannerService: () => Promise<any>;
export declare const getBannerById: (id: string) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
} | null>;
export declare const updateBannerService: (id: string, data: Partial<CreateBannerInput>) => Promise<{
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    endDate: Date;
    imageUrl: string;
    redirectUrl: string | null;
    startDate: Date;
}>;
export declare const deleteBannerService: (id: string) => Promise<void>;
export {};
//# sourceMappingURL=banner.service.d.ts.map