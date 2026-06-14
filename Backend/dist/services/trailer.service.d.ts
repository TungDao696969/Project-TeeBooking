type CreateTrailerPayload = {
    movieId: string;
    title: string;
    videoUrl: string;
    thumbnailUrl?: string;
    type: "teaser" | "official" | "final" | "clip" | "behind_the_scenes";
    sortOrder?: number;
};
type UpdateTrailerPayload = {
    title?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    type?: "teaser" | "official" | "final" | "clip" | "behind_the_scenes";
    isActive?: boolean;
    sortOrder?: number;
};
export declare const createTrailerService: (payload: CreateTrailerPayload) => Promise<{
    success: boolean;
    message: string;
    data: {
        type: import("../generated/prisma/enums").TrailerType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        movieId: string;
        isActive: boolean;
        title: string;
        thumbnailUrl: string | null;
        videoUrl: string;
        sortOrder: number;
    };
}>;
export declare const getTrailerByMovieService: (movieId: string) => Promise<any>;
export declare const getTrailerByIdService: (id: string) => Promise<{
    success: boolean;
    data: {
        type: import("../generated/prisma/enums").TrailerType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        movieId: string;
        isActive: boolean;
        title: string;
        thumbnailUrl: string | null;
        videoUrl: string;
        sortOrder: number;
    };
}>;
export declare const updateTrailerService: (id: string, payload: UpdateTrailerPayload) => Promise<{
    success: boolean;
    message: string;
    data: {
        type: import("../generated/prisma/enums").TrailerType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        movieId: string;
        isActive: boolean;
        title: string;
        thumbnailUrl: string | null;
        videoUrl: string;
        sortOrder: number;
    };
}>;
export declare const deleteTrailerService: (id: string) => Promise<{
    success: boolean;
    message: string;
}>;
export {};
//# sourceMappingURL=trailer.service.d.ts.map