import type { Request, Response } from "express";
type RequestWithCookies = Request & {
    cookies?: {
        refresh_token?: string;
    };
};
export declare const refreshTokenController: (req: RequestWithCookies, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=refreshToken.controller.d.ts.map