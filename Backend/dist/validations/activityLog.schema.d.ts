import { z } from "zod";
export declare const createCinemaRoomSchema: z.ZodObject<{
    cinemaId: z.ZodString;
    roomName: z.ZodString;
    roomType: z.ZodString;
    totalSeats: z.ZodNumber;
    screenType: z.ZodOptional<z.ZodString>;
    soundSystem: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCinemaRoomSchema: z.ZodObject<{
    cinemaId: z.ZodOptional<z.ZodString>;
    roomName: z.ZodOptional<z.ZodString>;
    roomType: z.ZodOptional<z.ZodString>;
    totalSeats: z.ZodOptional<z.ZodNumber>;
    screenType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    soundSystem: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateCinemaRoomInput = z.infer<typeof createCinemaRoomSchema>;
export type UpdateCinemaRoomInput = z.infer<typeof updateCinemaRoomSchema>;
//# sourceMappingURL=activityLog.schema.d.ts.map