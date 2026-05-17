"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueuePaymentSuccessJob = exports.paymentSuccessQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../utils/redis");
exports.paymentSuccessQueue = new bullmq_1.Queue("payment-success", {
    connection: redis_1.redis,
});
const enqueuePaymentSuccessJob = async (bookingId) => {
    await exports.paymentSuccessQueue.add("confirm-booking-and-generate-invoice", { bookingId }, {
        jobId: `payment-success:${bookingId}`,
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 5000,
        },
        removeOnComplete: {
            age: 24 * 60 * 60,
            count: 1000,
        },
        removeOnFail: false,
    });
};
exports.enqueuePaymentSuccessJob = enqueuePaymentSuccessJob;
//# sourceMappingURL=payment-success.queue.js.map