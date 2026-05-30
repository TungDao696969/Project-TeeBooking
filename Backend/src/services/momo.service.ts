import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../utils/prisma";

import { generateSignature } from "../utils/momo";
import { enqueuePaymentSuccessJob } from "../queue/payment-success.queue";

const MOMO_SUCCESS_CODE = 0;

const getEnv = (name: string, fallbackName?: string) => {
  const value =
    process.env[name] || (fallbackName ? process.env[fallbackName] : undefined);

  if (!value) {
    throw new Error(
      `Missing MoMo configuration: ${name}${
        fallbackName ? ` or ${fallbackName}` : ""
      }`,
    );
  }

  return value;
};

const normalizeMoMoParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params || {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  ) as Record<string, any>;
};

const buildMoMoCallbackSignature = (params: Record<string, any>) => {
  const accessKey = getEnv("MOMO_ACCESS_KEY");

  return (
    `accessKey=${accessKey}` +
    `&amount=${params.amount ?? ""}` +
    `&extraData=${params.extraData ?? ""}` +
    `&message=${params.message ?? ""}` +
    `&orderId=${params.orderId ?? ""}` +
    `&orderInfo=${params.orderInfo ?? ""}` +
    `&orderType=${params.orderType ?? ""}` +
    `&partnerCode=${params.partnerCode ?? ""}` +
    `&payType=${params.payType ?? ""}` +
    `&requestId=${params.requestId ?? ""}` +
    `&responseTime=${params.responseTime ?? ""}` +
    `&resultCode=${params.resultCode ?? ""}` +
    `&transId=${params.transId ?? ""}`
  );
};

const verifyMoMoCallbackSignature = (params: Record<string, any>) => {
  const partnerCode = getEnv("MOMO_PARTNER_CODE");
  const secretKey = getEnv("MOMO_SECRET_KEY");
  const signature = params.signature;

  if (params.partnerCode !== partnerCode) {
    throw new Error("Invalid MoMo partnerCode");
  }

  if (!signature) {
    throw new Error("Missing MoMo signature");
  }

  const rawSignature = buildMoMoCallbackSignature(params);
  const checkSignature = generateSignature(rawSignature, secretKey);

  if (String(signature).toLowerCase() !== checkSignature.toLowerCase()) {
    throw new Error("Invalid MoMo signature");
  }
};

export const createMoMoPayment = async (bookingId: string) => {
  if (!bookingId) {
    throw new Error("Missing bookingId");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const amountNumber = Math.round(booking.finalAmount);
  if (amountNumber < 1000 || amountNumber > 50000000) {
    throw new Error("MoMo amount must be between 1000 and 50000000 VND");
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      paymentMethod: "momo",
      paymentGateway: "MOMO",
      amount: booking.finalAmount,
      status: "pending",
    },
  });

  const partnerCode = getEnv("MOMO_PARTNER_CODE");
  const accessKey = getEnv("MOMO_ACCESS_KEY");
  const secretKey = getEnv("MOMO_SECRET_KEY");
  const endpoint = getEnv("MOMO_ENDPOINT");
  const redirectUrl = getEnv("MOMO_REDIRECT_URL", "MOMO_RETURN_URL");
  const ipnUrl = getEnv("MOMO_IPN_URL", "MOMO_NOTIFY_URL");

  const requestId = uuidv4();
  const orderId = payment.id;
  const orderInfo = `Thanh toan booking ${bookingId}`;
  const amount = String(Math.round(payment.amount));
  const requestType = "captureWallet";
  const extraData = "";

  const rawSignature =
    `accessKey=${accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&ipnUrl=${ipnUrl}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&partnerCode=${partnerCode}` +
    `&redirectUrl=${redirectUrl}` +
    `&requestId=${requestId}` +
    `&requestType=${requestType}`;

  const signature = generateSignature(rawSignature, secretKey);

  const body = {
    partnerCode,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: "vi",
    autoCapture: true,
  };

  try {
    const response = await axios.post(endpoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data?.payUrl) {
      throw new Error(response.data?.message || "MoMo response missing payUrl");
    }

    return response.data.payUrl;
  } catch (error: any) {
    const momoError = error.response?.data;
    console.error("MOMO ERROR:", momoError || error.message);

    throw new Error(
      momoError?.message ||
        momoError?.localMessage ||
        momoError?.errorMessage ||
        error.message ||
        "Failed to create MoMo payment",
    );
  }
};

export const handleMoMoIPN = async (body: any) => {
  const params = normalizeMoMoParams(body);
  verifyMoMoCallbackSignature(params);

  const { orderId, transId } = params;
  const resultCode = Number(params.resultCode);
  const amount = Number(params.amount);

  if (!orderId) {
    throw new Error("Missing MoMo orderId");
  }

  if (!Number.isFinite(resultCode)) {
    throw new Error("Invalid MoMo resultCode");
  }

  if (!Number.isFinite(amount)) {
    throw new Error("Invalid MoMo amount");
  }

  const payment = await prisma.payment.findUnique({
    where: { id: orderId },
  });

  if (!payment) {
    throw new Error("MoMo payment not found");
  }

  if (Math.round(payment.amount) !== Math.round(amount)) {
    throw new Error("MoMo amount mismatch");
  }

  if (payment.status === "paid") {
    await enqueuePaymentSuccessJob(payment.bookingId);

    return { message: "already processed" };
  }

  if (resultCode === MOMO_SUCCESS_CODE) {
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: orderId },
        data: {
          status: "paid",
          paidAt: new Date(),
          transactionCode: String(transId),
        },
      });

      await tx.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: "confirmed",
          paymentStatus: "paid",
        },
      });
    });

    await enqueuePaymentSuccessJob(payment.bookingId);
  } else {
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: orderId },
        data: {
          status: "failed",
        },
      });

      await tx.booking.update({
        where: { id: payment.bookingId },
        data: {
          paymentStatus: "failed",
        },
      });
    });
  }

  return { message: "received" };
};

export const handleMoMoReturn = async (query: any) => {
  const params = normalizeMoMoParams(query);
  await handleMoMoIPN(params);
  const payment = params.orderId
    ? await prisma.payment.findUnique({
        where: { id: String(params.orderId) },
        select: { bookingId: true },
      })
    : null;

  return {
    status:
      Number(params.resultCode) === MOMO_SUCCESS_CODE
        ? ("success" as const)
        : ("failed" as const),
    bookingId: payment?.bookingId ?? null,
  };
};
