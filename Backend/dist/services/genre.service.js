"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenreService = exports.updateGenreService = exports.getGenreByIdService = exports.getGenresService = exports.createGenreService = void 0;
const prisma_1 = require("../utils/prisma");
const slug_1 = require("../utils/slug");
const createGenreService = async (name) => {
    const slug = (0, slug_1.generateSlug2)(name);
    const existingGenre = await prisma_1.prisma.genre.findUnique({
        where: { slug },
    });
    if (existingGenre) {
        throw new Error("Genre already exists");
    }
    return prisma_1.prisma.genre.create({
        data: {
            name,
            slug,
        },
    });
};
exports.createGenreService = createGenreService;
const getGenresService = async (page, limit, search) => {
    const skip = (page - 1) * limit;
    const whereClause = search
        ? {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    slug: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        }
        : {};
    const [genres, total] = await Promise.all([
        prisma_1.prisma.genre.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.genre.count({
            where: whereClause,
        }),
    ]);
    return {
        data: genres,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getGenresService = getGenresService;
const getGenreByIdService = async (id) => {
    const genre = await prisma_1.prisma.genre.findUnique({
        where: { id },
        include: {
            movies: true,
        },
    });
    if (!genre) {
        throw new Error("Genre not found");
    }
    return genre;
};
exports.getGenreByIdService = getGenreByIdService;
const updateGenreService = async (id, name) => {
    const slug = (0, slug_1.generateSlug2)(name);
    return prisma_1.prisma.genre.update({
        where: { id },
        data: {
            name,
            slug,
        },
    });
};
exports.updateGenreService = updateGenreService;
const deleteGenreService = async (id) => {
    return prisma_1.prisma.genre.delete({
        where: { id },
    });
};
exports.deleteGenreService = deleteGenreService;
//# sourceMappingURL=genre.service.js.map