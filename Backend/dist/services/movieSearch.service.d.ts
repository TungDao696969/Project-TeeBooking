type SearchParams = {
    q?: string;
    genre?: string;
    status?: string;
    minRating?: number;
    year?: number;
    sort?: string;
    page?: number;
    limit?: number;
};
export declare const searchMoviesService: (params: SearchParams) => Promise<any>;
export declare const getMovieSuggestionsService: (q: string) => Promise<{
    id: string;
    slug: string;
    title: string;
    posterUrl: string | null;
}[]>;
export {};
//# sourceMappingURL=movieSearch.service.d.ts.map