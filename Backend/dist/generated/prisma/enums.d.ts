export declare const UserRole: {
    readonly customer: "customer";
    readonly guide: "guide";
    readonly admin: "admin";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const BookingStatus: {
    readonly pending: "pending";
    readonly paid: "paid";
    readonly cancelled: "cancelled";
    readonly completed: "completed";
    readonly refunded: "refunded";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const PaymentStatus: {
    readonly pending: "pending";
    readonly success: "success";
    readonly failed: "failed";
    readonly refunded: "refunded";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const PaymentMethod: {
    readonly stripe: "stripe";
    readonly paypal: "paypal";
    readonly vnpay: "vnpay";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const DiscountType: {
    readonly percentage: "percentage";
    readonly fixed: "fixed";
};
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];
//# sourceMappingURL=enums.d.ts.map