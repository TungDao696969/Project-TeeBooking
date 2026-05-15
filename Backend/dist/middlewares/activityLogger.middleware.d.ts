import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
export declare const activityLogger: (action: string, targetType: string) => (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=activityLogger.middleware.d.ts.map