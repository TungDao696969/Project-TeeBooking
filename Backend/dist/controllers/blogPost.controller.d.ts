import { Request, Response } from "express";
export declare const createBlogPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllBlogPosts: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBlogPostById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBlogPostBySlug: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBlogPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBlogPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=blogPost.controller.d.ts.map