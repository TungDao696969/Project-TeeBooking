export declare const getHomeService: () => Promise<{
    banners: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        endDate: Date;
        imageUrl: string;
        redirectUrl: string | null;
        startDate: Date;
    }[];
    nowShowing: {
        id: string;
        slug: string;
        title: string;
        durationMinutes: number;
        ageRating: string | null;
        posterUrl: string | null;
        status: import("../../generated/prisma/enums").MovieStatus;
    }[];
    comingSoon: {
        id: string;
        slug: string;
        title: string;
        releaseDate: Date;
        posterUrl: string | null;
        status: import("../../generated/prisma/enums").MovieStatus;
    }[];
    cinemas: {
        name: string;
        address: string;
        id: string;
        slug: string;
    }[];
    promotions: {
        type: import("../../generated/prisma/enums").PromotionType;
        id: string;
        title: string;
        description: string | null;
        endDate: Date;
        imageUrl: string | null;
        startDate: Date;
        discountValue: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
    }[];
    blogs: {
        id: string;
        slug: string;
        createdAt: Date;
        title: string;
        thumbnailUrl: string | null;
    }[];
}>;
//# sourceMappingURL=home.service.d.ts.map