import { Request, Response } from "express";
export declare const createMovie: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMovies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMovieById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateMovie: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMovieShowtimes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMovie: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTrashMovies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const restoreMovie: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=movie.controller.d.ts.map