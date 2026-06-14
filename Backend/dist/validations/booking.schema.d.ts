import { z } from "zod";
export declare const createBookingSchema: z.ZodObject<{
    showtimeId: z.ZodString;
    seatIds: z.ZodArray<z.ZodString>;
    comboIds: z.ZodOptional<z.ZodArray<z.ZodObject<{
        comboId: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strip>>>;
    tickets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ticketTypeId: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
//# sourceMappingURL=booking.schema.d.ts.map