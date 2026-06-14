export declare const getMembershipService: (userId: string) => Promise<any>;
export declare const createMembershipService: (userId: string) => Promise<{
    level: string;
    id: string;
    userId: string;
    membershipCode: string;
    points: number;
    lifetimePoints: number;
    joinedAt: Date;
    expiredAt: Date | null;
}>;
export declare const updateMembershipService: (userId: string, data: {
    level?: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
    points?: number;
    lifetimePoints?: number;
}) => Promise<{
    level: string;
    id: string;
    userId: string;
    membershipCode: string;
    points: number;
    lifetimePoints: number;
    joinedAt: Date;
    expiredAt: Date | null;
}>;
export declare const deleteMembershipService: (userId: string) => Promise<void>;
//# sourceMappingURL=membership.service.d.ts.map