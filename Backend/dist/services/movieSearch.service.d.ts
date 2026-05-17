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
export {};
//# sourceMappingURL=movieSearch.service.d.ts.map