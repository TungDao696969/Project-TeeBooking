type ReviewPayload = {
    movieId: string;
    rating: number;
    comment: string;
};
type UpdateReviewPayload = {
    rating: number;
    comment: string;
};
export declare const createReviewService: (userId: string, payload: ReviewPayload) => Promise<{
    success: boolean;
    message: string;
    data: {
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        movieId: string;
        rating: number;
        comment: string | null;
    };
}>;
export declare const updateReviewService: (userId: string, reviewId: string, payload: UpdateReviewPayload) => Promise<{
    success: boolean;
    message: string;
    data: {
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        movieId: string;
        rating: number;
        comment: string | null;
    };
}>;
export declare const deleteReviewService: (userId: string, reviewId: string) => Promise<{
    success: boolean;
    message: string;
}>;
export declare const getReviewService: (movieId: string, page?: number, limit?: number) => Promise<{
    success: boolean;
    data: {
        averageRating: number;
        totalReviews: number;
        reviews: ({
            user: {
                fullName: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            movieId: string;
            rating: number;
            comment: string | null;
        })[];
    };
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export {};
//# sourceMappingURL=review.service.d.ts.map