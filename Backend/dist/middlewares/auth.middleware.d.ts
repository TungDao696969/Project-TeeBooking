import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../generated/prisma/enums";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: UserRole;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorizeRoles: (...roles: UserRole[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map