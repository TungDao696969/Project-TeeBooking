import { VoucherStatus } from "../generated/prisma/enums";
import type { CreateVoucherInput, UpdateVoucherInput } from "../validations/voucher.schema";
export declare const createVoucherService: (data: CreateVoucherInput) => Promise<{
    id: string;
    createdAt: Date;
    status: VoucherStatus;
    code: string;
    promotionId: string;
    usageLimit: number;
    usedCount: number;
}>;
export declare const getAllVouchersService: () => Promise<any>;
export declare const getVoucherByIdService: (id: string) => Promise<{
    promotion: {
        type: import("../generated/prisma/enums").PromotionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        description: string | null;
        endDate: Date;
        imageUrl: string | null;
        startDate: Date;
        discountValue: number;
        minOrderValue: number | null;
        maxDiscount: number | null;
    };
    users: {
        id: string;
        userId: string;
        voucherId: string;
        usedAt: Date | null;
    }[];
} & {
    id: string;
    createdAt: Date;
    status: VoucherStatus;
    code: string;
    promotionId: string;
    usageLimit: number;
    usedCount: number;
}>;
export declare const updateVoucherService: (id: string, data: UpdateVoucherInput) => Promise<{
    id: string;
    createdAt: Date;
    status: VoucherStatus;
    code: string;
    promotionId: string;
    usageLimit: number;
    usedCount: number;
}>;
export declare const deleteVoucherService: (id: string) => Promise<void>;
export declare const redeemVoucherService: (userId: string, code: string) => Promise<boolean>;
//# sourceMappingURL=voucher.service.d.ts.map