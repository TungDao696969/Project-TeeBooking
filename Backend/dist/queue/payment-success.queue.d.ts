import { Queue } from "bullmq";
export declare const paymentSuccessQueue: Queue<any, any, string, any, any, string>;
export declare const enqueuePaymentSuccessJob: (bookingId: string) => Promise<void>;
//# sourceMappingURL=payment-success.queue.d.ts.map