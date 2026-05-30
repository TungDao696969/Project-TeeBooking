import { Request, Response } from "express";
export declare const createVnpayPaymentController: (req: Request & {
    user?: {
        id: string;
    };
}, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const vnpayReturnController: (req: Request, res: Response) => Promise<void>;
export declare const vnpayIPNController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createMoMoController: (req: Request & {
    user?: {
        id: string;
    };
}, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const momoIPNController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const momoReturnController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=payment.controller.d.ts.map