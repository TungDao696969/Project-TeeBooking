import { CreateNotificationInput, UpdateNotificationInput } from "../validations/notification.validation";
export declare const createNotificationService: (userId: string, data: CreateNotificationInput) => Promise<{
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    userId: string;
    content: string;
    isRead: boolean;
}>;
export declare const getAllNotificationService: (userId: string) => Promise<any>;
export declare const getNotificationByIdService: (userId: string, id: string) => Promise<{
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    userId: string;
    content: string;
    isRead: boolean;
} | null>;
export declare const updateNotificationService: (userId: string, id: string, data: UpdateNotificationInput) => Promise<{
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    userId: string;
    content: string;
    isRead: boolean;
}>;
export declare const deleteNotificationService: (userId: string, id: string) => Promise<boolean>;
export declare const markAsReadService: (userId: string, id: string) => Promise<{
    type: string | null;
    id: string;
    createdAt: Date;
    title: string;
    userId: string;
    content: string;
    isRead: boolean;
}>;
//# sourceMappingURL=notification.service.d.ts.map