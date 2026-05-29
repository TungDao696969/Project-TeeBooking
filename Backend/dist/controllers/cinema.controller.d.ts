import { Request, Response, NextFunction } from "express";
export declare const createCinema: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllCinemas: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCinemaBySlug: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCinema: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCinema: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCinemaShowtimes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cinema.controller.d.ts.map