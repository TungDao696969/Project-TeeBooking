export declare const getHomeService: () => Promise<{
    banners: {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        endDate: Date;
        imageUrl: string;
        redirectUrl: string | null;
        startDate: Date;
    }[];
    nowShowing: {
        id: string;
        status: import("../../generated/prisma/enums").MovieStatus;
        title: string;
        slug: string;
        durationMinutes: number;
        ageRating: string | null;
        posterUrl: string | null;
    }[];
    comingSoon: {
        id: string;
        status: import("../../generated/prisma/enums").MovieStatus;
        title: string;
        slug: string;
        releaseDate: Date;
        posterUrl: string | null;
    }[];
    cinemas: {
        name: string;
        id: string;
        slug: string;
        address: string;
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
        createdAt: Date;
        title: string;
        slug: string;
        thumbnailUrl: string | null;
    }[];
}>;
//# sourceMappingURL=home.service.d.ts.map