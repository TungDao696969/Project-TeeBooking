import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare const createAddressController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAddressController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAddressByIdController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUserAddress: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAddressController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const setDefaultAddressController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=address.controller.d.ts.map