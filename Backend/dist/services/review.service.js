"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewService = exports.deleteReviewService = exports.updateReviewService = exports.createReviewService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const clearMovieCache = async () => {
    const keys = await redis_1.redis.keys("movie:*");
    if (keys.length) {
        await redis_1.redis.del(...keys);
    }
};
const createReviewService = async (userId, payload) => {
    const existingReview = await prisma_1.prisma.review.findUnique({
        where: {
            userId_movieId: {
                userId,
                movieId: payload.movieId,
            },
        },
    });
    if (existingReview) {
        throw new Error("You have already reviewed this movie");
    }
    const review = await prisma_1.prisma.review.create({
        data: {
            userId,
            movieId: payload.movieId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });
    await clearMovieCache();
    return {
        success: true,
        message: "Review created successfully",
        data: review,
    };
};
exports.createReviewService = createReviewService;
const updateReviewService = async (userId, reviewId, payload) => {
    const review = await prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new Error("Review not found");
    }
    if (review.userId !== userId) {
        throw new Error("Unauthorized");
    }
    const updatedReview = await prisma_1.prisma.review.update({
        where: {
            id: reviewId,
        },
        data: payload,
    });
    await clearMovieCache();
    return {
        success: true,
        message: "Review updated successfully",
        data: updatedReview,
    };
};
exports.updateReviewService = updateReviewService;
const deleteReviewService = async (userId, reviewId) => {
    const review = await prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new Error("Review not found");
    }
    if (review.userId !== userId) {
        throw new Error("Unauthorized");
    }
    await prisma_1.prisma.review.delete({
        where: {
            id: reviewId,
        },
    });
    return {
        success: true,
        message: "Review deleted successfully",
    };
};
exports.deleteReviewService = deleteReviewService;
const getReviewService = async (movieId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [reviews, total, averageRatingData] = await Promise.all([
        prisma_1.prisma.review.findMany({
            where: { movieId },
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        avatarUrl: true,
                    },
                },
            },
        }),
        prisma_1.prisma.review.count({
            where: { movieId },
        }),
        prisma_1.prisma.review.aggregate({
            where: { movieId },
            _avg: {
                rating: true,
            },
        }),
    ]);
    return {
        success: true,
        data: {
            averageRating: Number((averageRatingData._avg.rating || 0).toFixed(1)),
            totalReviews: total,
            reviews,
        },
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getReviewService = getReviewService;
//# sourceMappingURL=review.service.js.map