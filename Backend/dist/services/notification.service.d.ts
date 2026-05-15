import { CreateNotificationInput, UpdateNotificationInput } from "../validations/notification.validation";
export declare const createNotificationService: (userId: string, data: CreateNotificationInput) => Promise<{
    userId: string;
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    isRead: boolean;
}>;
export declare const getAllNotificationService: (userId: string) => Promise<any>;
export declare const getNotificationByIdService: (userId: string, id: string) => Promise<{
    userId: string;
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    isRead: boolean;
} | null>;
export declare const updateNotificationService: (userId: string, id: string, data: UpdateNotificationInput) => Promise<{
    userId: string;
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    isRead: boolean;
}>;
export declare const deleteNotificationService: (userId: string, id: string) => Promise<boolean>;
export declare const markAsReadService: (userId: string, id: string) => Promise<{
    userId: string;
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    isRead: boolean;
}>;
//# sourceMappingURL=notification.service.d.ts.map