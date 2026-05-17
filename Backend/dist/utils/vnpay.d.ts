export declare const sortObject: (obj: Record<string, any>) => Record<string, string>;
export declare const buildVnpaySignData: (data: Record<string, any>) => string;
export declare const createSecureHash: (data: Record<string, any>, secret: string) => string;
export declare const buildVnpayPaymentUrl: (vnpUrl: string, params: Record<string, any>, secret: string) => string;
export declare const toVnpayTxnRef: (paymentId: string) => string;
export declare const fromVnpayTxnRef: (txnRef: string) => string;
//# sourceMappingURL=vnpay.d.ts.map