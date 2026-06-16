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
        id: any;
        title: any;
        slug: any;
        originalTitle: any;
        description: any;
        durationMinutes: any;
        releaseDate: any;
        ageRating: any;
        language: any;
        subtitle: any;
        trailerUrl: any;
        posterUrl: any;
        bannerUrl: any;
        status: any;
        country: any;
        producer: any;
        genres: any;
    }[];
    comingSoon: {
        id: any;
        title: any;
        slug: any;
        originalTitle: any;
        description: any;
        durationMinutes: any;
        releaseDate: any;
        ageRating: any;
        language: any;
        subtitle: any;
        trailerUrl: any;
        posterUrl: any;
        bannerUrl: any;
        status: any;
        country: any;
        producer: any;
        genres: any;
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