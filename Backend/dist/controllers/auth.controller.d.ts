import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare const registerController: (req: Request, res: Response) => Promise<void>;
export declare const loginController: (req: Request, res: Response) => Promise<void>;
export declare const logoutController: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const forgotPasswordController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resetPasswordController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const changePasswordController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map