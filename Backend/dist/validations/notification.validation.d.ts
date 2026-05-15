import { z } from "zod";
export declare const createNotificationSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    type: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateNotificationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    isRead: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
//# sourceMappingURL=notification.validation.d.ts.map