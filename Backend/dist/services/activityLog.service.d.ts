export declare const createActivityLogService: (data: {
    userId: string;
    action: string;
    targetType: string;
    targetId?: string;
    ipAddress?: string;
    userAgent?: string;
}) => Promise<{
    userId: string;
    id: string;
    createdAt: Date;
    action: string;
    targetType: string;
    targetId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
}>;
export declare const getUserActivityLogsService: (userId: string) => Promise<any>;
export declare const getActivityLogByIdService: (id: string, userId: string) => Promise<{
    userId: string;
    id: string;
    createdAt: Date;
    action: string;
    targetType: string;
    targetId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
}>;
export declare const deleteActivityLogService: (id: string, userId: string) => Promise<void>;
export declare const clearUserActivityLogsService: (userId: string) => Promise<void>;
//# sourceMappingURL=activityLog.service.d.ts.map