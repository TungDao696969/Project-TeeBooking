export declare const UserRole: {
    readonly customer: "customer";
    readonly admin: "admin";
    readonly manager: "manager";
    readonly staff: "staff";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const GenderType: {
    readonly male: "male";
    readonly female: "female";
    readonly other: "other";
};
export type GenderType = (typeof GenderType)[keyof typeof GenderType];
export declare const SeatType: {
    readonly standard: "standard";
    readonly vip: "vip";
    readonly couple: "couple";
    readonly recliner: "recliner";
};
export type SeatType = (typeof SeatType)[keyof typeof SeatType];
export declare const SeatStatus: {
    readonly available: "available";
    readonly reserved: "reserved";
    readonly booked: "booked";
    readonly maintenance: "maintenance";
};
export type SeatStatus = (typeof SeatStatus)[keyof typeof SeatStatus];
export declare const BookingStatus: {
    readonly pending: "pending";
    readonly confirmed: "confirmed";
    readonly cancelled: "cancelled";
    readonly completed: "completed";
    readonly refunded: "refunded";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const PaymentMethod: {
    readonly momo: "momo";
    readonly zalopay: "zalopay";
    readonly vnpay: "vnpay";
    readonly credit_card: "credit_card";
    readonly debit_card: "debit_card";
    readonly cash: "cash";
    readonly bank_transfer: "bank_transfer";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly pending: "pending";
    readonly paid: "paid";
    readonly failed: "failed";
    readonly refund_pending: "refund_pending";
    readonly refunded: "refunded";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const BookingPaymentStatus: {
    readonly pending: "pending";
    readonly paid: "paid";
    readonly failed: "failed";
    readonly refunded: "refunded";
};
export type BookingPaymentStatus = (typeof BookingPaymentStatus)[keyof typeof BookingPaymentStatus];
export declare const MovieStatus: {
    readonly coming_soon: "coming_soon";
    readonly now_showing: "now_showing";
    readonly ended: "ended";
};
export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus];
export declare const PromotionType: {
    readonly percentage: "percentage";
    readonly fixed_amount: "fixed_amount";
    readonly combo: "combo";
};
export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];
export declare const VoucherStatus: {
    readonly active: "active";
    readonly inactive: "inactive";
    readonly expired: "expired";
};
export type VoucherStatus = (typeof VoucherStatus)[keyof typeof VoucherStatus];
export declare const TrailerType: {
    readonly teaser: "teaser";
    readonly official: "official";
    readonly final: "final";
    readonly clip: "clip";
    readonly behind_the_scenes: "behind_the_scenes";
};
export type TrailerType = (typeof TrailerType)[keyof typeof TrailerType];
//# sourceMappingURL=enums.d.ts.map