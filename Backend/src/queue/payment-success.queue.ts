import { Queue } from "bullmq";
import { redis } from "../utils/redis";

export const paymentSuccessQueue = new Queue("payment-success", {
  connection: redis,
});

export const enqueuePaymentSuccessJob = async (bookingId: string) => {
  await paymentSuccessQueue.add(
    "confirm-booking-and-generate-invoice",
    { bookingId },
    {
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
    },
  );
};
