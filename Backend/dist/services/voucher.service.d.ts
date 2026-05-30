import { VoucherStatus } from "../generated/prisma/enums";
import type { CreateVoucherInput, UpdateVoucherInput } from "../validations/voucher.schema";
export declare const createVoucherService: (data: CreateVoucherInput) => Promise<{
    id: string;
    createdAt: Date;
    code: string;
    promotionId: string;
    usageLimit: number;
    status: VoucherStatus;
    usedCount: number;
}>;
export declare const getAllVouchersService: () => Promise<any>;
export declare const getVoucherByIdService: (id: string) => Promise<{
    promotion: {
        type: import("../generated/prisma/enums").PromotionType;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        endDate: Date;
        imageUrl: string | null;
        discountValue: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
        startDate: Date;
    };
    users: {
        userId: string;
        id: string;
        voucherId: string;
        usedAt: Date | null;
    }[];
} & {
    id: string;
    createdAt: Date;
    code: string;
    promotionId: string;
    usageLimit: number;
    status: VoucherStatus;
    usedCount: number;
}>;
export declare const updateVoucherService: (id: string, data: UpdateVoucherInput) => Promise<{
    id: string;
    createdAt: Date;
    code: string;
    promotionId: string;
    usageLimit: number;
    status: VoucherStatus;
    usedCount: number;
}>;
export declare const deleteVoucherService: (id: string) => Promise<void>;
export declare const redeemVoucherService: (userId: string, code: string) => Promise<boolean>;
//# sourceMappingURL=voucher.service.d.ts.map