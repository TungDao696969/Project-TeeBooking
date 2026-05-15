import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { generateSlug } from "../utils/slug";
import {
  CreateBlogInput,
  UpdateBlogInput,
} from "../validations/blogPost.validation";

const cache_ttl = Number(process.env.CACHE_TTL);

// CREATE
export const createBlogPostService = async (data: CreateBlogInput) => {
  const author = await prisma.user.findUnique({
    where: { id: data.authorId },
  });

  if (!author) {
    throw new Error("Author not found");
  }

  let slug = generateSlug(data.title);

  const existingSlug = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  const blogPost = await prisma.blogPost.create({
    data: {
      ...data,
      slug,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    },
    include: {
      author: true,
    },
  });

  await redis.del("blogPosts:all");

  return blogPost;
};

// GET ALL
export const getAllBlogPostsService = async () => {
  const cacheKey = "blogPosts:all";

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const posts = await prisma.blogPost.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(posts), "EX", cache_ttl);

  return posts;
};

// GET BY ID
export const getBlogPostByIdService = async (id: string) => {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
};

// GET BY SLUG
export const getBlogPostBySlugService = async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  });
};

// UPDATE
export const updateBlogPostService = async (
  id: string,
  data: UpdateBlogInput,
) => {
  const existing = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Blog post not found");
  }

  let slug = existing.slug;

  if (data.title) {
    slug = generateSlug(data.title);

    const duplicate = await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (duplicate) {
      slug = `${slug}-${Date.now()}`;
    }
  }

  const updated = await prisma.blogPost.update({
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

  await redis.del("blogPosts:all");

  return updated;
};

// DELETE
export const deleteBlogPostService = async (id: string) => {
  const existing = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Blog post not found");
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  await redis.del("blogPosts:all");

  return true;
};
