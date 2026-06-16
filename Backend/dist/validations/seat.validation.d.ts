import { z } from "zod";
export declare const createSeatSchema: z.ZodObject<{
    roomId: z.ZodString;
    seatRow: z.ZodString;
    seatNumber: z.ZodNumber;
    seatCode: z.ZodString;
    seatType: z.ZodEnum<{
        standard: "standard";
        vip: "vip";
        couple: "couple";
        recliner: "recliner";
    }>;
    extraPrice: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateSeatSchema: z.ZodObject<{
    roomId: z.ZodOptional<z.ZodString>;
    seatRow: z.ZodOptional<z.ZodString>;
    seatNumber: z.ZodOptional<z.ZodNumber>;
    seatCode: z.ZodOptional<z.ZodString>;
    seatType: z.ZodOptional<z.ZodEnum<{
        standard: "standard";
        vip: "vip";
        couple: "couple";
        recliner: "recliner";
    }>>;
    extraPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export type CreateSeatInput = z.infer<typeof createSeatSchema>;
export type UpdateSeatInput = z.infer<typeof updateSeatSchema>;
export declare const generateSeatSchema: z.ZodObject<{
    roomId: z.ZodString;
    rows: z.ZodArray<z.ZodString>;
    seatsPerRow: z.ZodNumber;
}, z.core.$strip>;
export declare const updateSeatTypeSchema: z.ZodObject<{
    roomId: z.ZodString;
    startRow: z.ZodString;
    endRow: z.ZodString;
    seatType: z.ZodEnum<{
        standard: "standard";
        vip: "vip";
        couple: "couple";
        recliner: "recliner";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=seat.validation.d.ts.map