export declare const createMovieService: (data: any) => Promise<{
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    language: string | null;
    subtitle: string | null;
    title: string;
    originalTitle: string | null;
    description: string;
    durationMinutes: number;
    releaseDate: Date;
    endDate: Date | null;
    ageRating: string | null;
    trailerUrl: string | null;
    posterUrl: string | null;
    bannerUrl: string | null;
    status: import("../generated/prisma/enums").MovieStatus;
    country: string | null;
    producer: string | null;
}>;
export declare const getMoviesService: (page?: number, limit?: number, search?: string) => Promise<any>;
export declare const getMovieByIdService: (id: string) => Promise<({
    genres: ({
        genre: {
            name: string;
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        movieId: string;
        genreId: string;
    })[];
    casts: ({
        person: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
            bio: string | null;
            birthDate: Date | null;
            nationality: string | null;
        };
    } & {
        id: string;
        movieId: string;
        personId: string;
        roleType: string;
        characterName: string | null;
    })[];
} & {
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    language: string | null;
    subtitle: string | null;
    title: string;
    originalTitle: string | null;
    description: string;
    durationMinutes: number;
    releaseDate: Date;
    endDate: Date | null;
    ageRating: string | null;
    trailerUrl: string | null;
    posterUrl: string | null;
    bannerUrl: string | null;
    status: import("../generated/prisma/enums").MovieStatus;
    country: string | null;
    producer: string | null;
}) | null>;
export declare const updateMovieService: (id: string, data: any) => Promise<{
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    language: string | null;
    subtitle: string | null;
    title: string;
    originalTitle: string | null;
    description: string;
    durationMinutes: number;
    releaseDate: Date;
    endDate: Date | null;
    ageRating: string | null;
    trailerUrl: string | null;
    posterUrl: string | null;
    bannerUrl: string | null;
    status: import("../generated/prisma/enums").MovieStatus;
    country: string | null;
    producer: string | null;
}>;
export declare const deleteMovieService: (id: string) => Promise<boolean>;
export declare const getMovieShowtimesService: (slug: string) => Promise<any>;
export declare const getTrashMoviesService: () => Promise<any>;
export declare const restoreMovieService: (id: string) => Promise<{
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    language: string | null;
    subtitle: string | null;
    title: string;
    originalTitle: string | null;
    description: string;
    durationMinutes: number;
    releaseDate: Date;
    endDate: Date | null;
    ageRating: string | null;
    trailerUrl: string | null;
    posterUrl: string | null;
    bannerUrl: string | null;
    status: import("../generated/prisma/enums").MovieStatus;
    country: string | null;
    producer: string | null;
}>;
//# sourceMappingURL=movie.service.d.ts.map