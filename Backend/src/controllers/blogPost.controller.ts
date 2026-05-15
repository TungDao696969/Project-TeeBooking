import { Request, Response } from "express";
import {
  createBlogPostService,
  getAllBlogPostsService,
  getBlogPostByIdService,
  getBlogPostBySlugService,
  updateBlogPostService,
  deleteBlogPostService,
} from "../services/blogPost.service";
import { errorHandler } from "../utils/errorHandler";
// CREATE
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await createBlogPostService(req.body);

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// GET ALL
export const getAllBlogPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await getAllBlogPostsService();

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// GET BY ID
export const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const post = await getBlogPostByIdService(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// GET BY SLUG
export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const post = await getBlogPostBySlugService(slug);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// UPDATE
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    const updated = await updateBlogPostService(id, req.body);

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};

// DELETE
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    await deleteBlogPostService(id);

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error: any) {
    errorHandler({
      error,
      res,
      defaultMessage: "Failed to fetch cinema",
    });
  }
};
