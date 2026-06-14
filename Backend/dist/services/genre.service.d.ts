export declare const createGenreService: (name: string) => Promise<{
    name: string;
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getGenresService: (page: number, limit: number, search?: string) => Promise<{
    data: {
        name: string;
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getGenreByIdService: (id: string) => Promise<{
    movies: {
        movieId: string;
        genreId: string;
    }[];
} & {
    name: string;
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateGenreService: (id: string, name: string) => Promise<{
    name: string;
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteGenreService: (id: string) => Promise<{
    name: string;
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=genre.service.d.ts.map