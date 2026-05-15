import { UserRole } from "../generated/prisma/enums";
import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";
export declare const roleMiddleware: (...allowedRoles: UserRole[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=role.middleware.d.ts.map