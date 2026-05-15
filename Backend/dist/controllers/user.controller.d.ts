import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare const getUserProfileController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateUserController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const uploadAvatarController: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map