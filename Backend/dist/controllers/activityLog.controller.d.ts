import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
export declare const getUserActivityLogsController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getActivityLogByIdController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteActivityLogController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const clearUserActivityLogsController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=activityLog.controller.d.ts.map