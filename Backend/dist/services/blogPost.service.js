"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPostService = exports.updateBlogPostService = exports.getBlogPostBySlugService = exports.getBlogPostByIdService = exports.getAllBlogPostsService = exports.createBlogPostService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const slug_1 = require("../utils/slug");
const cache_ttl = Number(process.env.CACHE_TTL);
// CREATE
const createBlogPostService = async (data) => {
    const author = await prisma_1.prisma.user.findUnique({
        where: { id: data.authorId },
    });
    if (!author) {
        throw new Error("Author not found");
    }
    let slug = (0, slug_1.generateSlug)(data.title);
    const existingSlug = await prisma_1.prisma.blogPost.findUnique({
        where: { slug },
    });
    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }
    const blogPost = await prisma_1.prisma.blogPost.create({
        data: {
            ...data,
            slug,
            publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        },
        include: {
            author: true,
        },
    });
    await redis_1.redis.del("blogPosts:all");
    return blogPost;
};
exports.createBlogPostService = createBlogPostService;
// GET ALL
const getAllBlogPostsService = async () => {
    const cacheKey = "blogPosts:all";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    const posts = await prisma_1.prisma.blogPost.findMany({
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(posts), "EX", cache_ttl);
    return posts;
};
exports.getAllBlogPostsService = getAllBlogPostsService;
// GET BY ID
const getBlogPostByIdService = async (id) => {
    return prisma_1.prisma.blogPost.findUnique({
        where: { id },
        include: {
            author: true,
        },
    });
};
exports.getBlogPostByIdService = getBlogPostByIdService;
// GET BY SLUG
const getBlogPostBySlugService = async (slug) => {
    return prisma_1.prisma.blogPost.findUnique({
        where: { slug },
        include: {
            author: true,
        },
    });
};
exports.getBlogPostBySlugService = getBlogPostBySlugService;
// UPDATE
const updateBlogPostService = async (id, data) => {
    const existing = await prisma_1.prisma.blogPost.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Blog post not found");
    }
    let slug = existing.slug;
    if (data.title) {
        slug = (0, slug_1.generateSlug)(data.title);
        const duplicate = await prisma_1.prisma.blogPost.findFirst({
            where: {
                slug,
                NOT: { id },
            },
        });
        if (duplicate) {
            slug = `${slug}-${Date.now()}`;
        }
    }
    const updated = await prisma_1.prisma.blogPost.update({
        where: { id },
        data: {
            ...data,
            slug,
            publishedAt: data.publishedAt
                ? new Date(data.publishedAt)
                : existing.publishedAt,
        },
        include: {
            author: true,
        },
    });
    await redis_1.redis.del("blogPosts:all");
    return updated;
};
exports.updateBlogPostService = updateBlogPostService;
// DELETE
const deleteBlogPostService = async (id) => {
    const existing = await prisma_1.prisma.blogPost.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new Error("Blog post not found");
    }
    await prisma_1.prisma.blogPost.delete({
        where: { id },
    });
    await redis_1.redis.del("blogPosts:all");
    return true;
};
exports.deleteBlogPostService = deleteBlogPostService;
//# sourceMappingURL=blogPost.service.js.map