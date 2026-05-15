import { Response } from "express";
interface ErrorResponseOptions {
    error: unknown;
    res: Response;
    defaultMessage?: string;
}
export declare const errorHandler: ({ error, res, defaultMessage, }: ErrorResponseOptions) => void;
export {};
//# sourceMappingURL=errorHandler.d.ts.map