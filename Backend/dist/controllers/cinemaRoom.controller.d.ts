import { Request, Response } from "express";
export declare const createCinemaRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllCinemaRooms: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRoomsByCinemaIdController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCinemaRoomById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCinemaRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCinemaRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTrashCinemaRooms: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const restoreCinemaRoom: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cinemaRoom.controller.d.ts.map