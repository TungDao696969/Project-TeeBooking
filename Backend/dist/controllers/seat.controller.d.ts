import { Request, Response } from "express";
export declare const createSeat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const generateSeats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllSeats: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSeatsByRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSeatById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateSeat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSeat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=seat.controller.d.ts.map