"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieShowtimesSchema = exports.updateMovieSchema = exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(255),
    originalTitle: zod_1.z.string().optional(),
    description: zod_1.z.string().min(10),
    durationMinutes: zod_1.z.coerce.number().min(1),
    releaseDate: zod_1.z.string(),
    endDate: zod_1.z.string().optional(),
    ageRating: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    subtitle: zod_1.z.string().optional(),
    trailerUrl: zod_1.z.string().optional(),
    status: zod_1.z.enum(["coming_soon", "now_showing", "ended"]),
    country: zod_1.z.string().optional(),
    producer: zod_1.z.string().optional(),
    genreIds: zod_1.z.string().optional(),
    directors: zod_1.z.string().optional(),
    actors: zod_1.z.string().optional(),
});
exports.updateMovieSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(255).optional(),
    originalTitle: zod_1.z.string().optional(),
    description: zod_1.z.string().min(10).optional(),
    durationMinutes: zod_1.z.coerce.number().min(1).optional(),
    releaseDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
    ageRating: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    subtitle: zod_1.z.string().optional(),
    trailerUrl: zod_1.z.string().url().optional(),
    posterUrl: zod_1.z.string().url().optional(),
    bannerUrl: zod_1.z.string().url().optional(),
    status: zod_1.z.enum(["coming_soon", "now_showing", "ended"]).optional(),
    country: zod_1.z.string().optional(),
    producer: zod_1.z.string().optional(),
    genreIds: zod_1.z.string().optional(),
    directors: zod_1.z.string().optional(),
    actors: zod_1.z.string().optional(),
});
exports.getMovieShowtimesSchema = zod_1.z.object({
    params: zod_1.z.object({
        slug: zod_1.z.string().min(1),
    }),
});
//# sourceMappingURL=movie.validation.js.map