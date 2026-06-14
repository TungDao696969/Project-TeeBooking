import { Request, Response } from "express";
export declare const createShowtime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllShowtimes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getShowtimeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateShowtime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteShowtime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getShowtimeTicketTypes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTrashShowtimes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const restoreShowtime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const forceDeleteShowtime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=showtime.controller.d.ts.map