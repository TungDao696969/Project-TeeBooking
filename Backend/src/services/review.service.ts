import { success } from "zod";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { createReviewInput } from "../validations/review.validation";

type ReviewPayload = {
  movieId: string;
  rating: number;
  comment: string;
};

type UpdateReviewPayload = {
  rating: number;
  comment: string;
};

const clearMovieCache = async () => {
  const keys = await redis.keys("movie:*");

  if (keys.length) {
    await redis.del(...keys);
  }
};

export const createReviewService = async (
  userId: string,
  payload: ReviewPayload,
) => {
  const existingReview = await prisma.review.findUnique({
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

  const review = await prisma.review.create({
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

export const updateReviewService = async (
  userId: string,
  reviewId: string,
  payload: UpdateReviewPayload,
) => {
  const review = await prisma.review.findUnique({
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

  const updatedReview = await prisma.review.update({
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

export const deleteReviewService = async (userId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({
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

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return {
    success: true,
    message: "Review deleted successfully",
  };
};

export const getReviewService = async (
  movieId: string,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  const [reviews, total, averageRatingData] = await Promise.all([
    prisma.review.findMany({
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

    prisma.review.count({
      where: { movieId },
    }),

    prisma.review.aggregate({
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
