"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.getBlogPostBySlug = exports.getBlogPostById = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const blogPost_service_1 = require("../services/blogPost.service");
const errorHandler_1 = require("../utils/errorHandler");
// CREATE
const createBlogPost = async (req, res) => {
    try {
        const post = await (0, blogPost_service_1.createBlogPostService)(req.body);
        return res.status(201).json({
            success: true,
            data: post,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.createBlogPost = createBlogPost;
// GET ALL
const getAllBlogPosts = async (_req, res) => {
    try {
        const posts = await (0, blogPost_service_1.getAllBlogPostsService)();
        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getAllBlogPosts = getAllBlogPosts;
// GET BY ID
const getBlogPostById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const post = await (0, blogPost_service_1.getBlogPostByIdService)(id);
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
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getBlogPostById = getBlogPostById;
// GET BY SLUG
const getBlogPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug || Array.isArray(slug)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const post = await (0, blogPost_service_1.getBlogPostBySlugService)(slug);
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
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.getBlogPostBySlug = getBlogPostBySlug;
// UPDATE
const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        const updated = await (0, blogPost_service_1.updateBlogPostService)(id, req.body);
        return res.status(200).json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.updateBlogPost = updateBlogPost;
// DELETE
const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room ID",
            });
        }
        await (0, blogPost_service_1.deleteBlogPostService)(id);
        return res.status(200).json({
            success: true,
            message: "Blog post deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({
            error,
            res,
            defaultMessage: "Failed to fetch cinema",
        });
    }
};
exports.deleteBlogPost = deleteBlogPost;
//# sourceMappingURL=blogPost.controller.js.map