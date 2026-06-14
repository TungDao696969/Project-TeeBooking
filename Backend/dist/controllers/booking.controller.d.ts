import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
export declare const createBooking: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getBookingDetailController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=booking.controller.d.ts.map