import crypto from "crypto";
import dayjs from "dayjs";
import { buildVnpaySignData, toVnpayTxnRef } from "../utils/vnpay";

export const createVnpayPaymentUrl = (
  paymentId: string,
  amount: number,
  ipAddr: string,
) => {
  const tmnCode = process.env.VNP_TMN_CODE!;
  const secretKey = process.env.VNP_HASH_SECRET!;
  const vnpUrl = process.env.VNP_URL!;
  const returnUrl = process.env.VNP_RETURN_URL!;

  const createDate = dayjs().format("YYYYMMDDHHmmss");

  const params: Record<string, string | number> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: toVnpayTxnRef(paymentId),
    vnp_OrderInfo: `Thanh toan booking ${paymentId}`,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  const signData = buildVnpaySignData(params);

  const signed = crypto
    .createHmac("sha512", secretKey)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");

  const paymentUrl = `${vnpUrl}?${signData}&vnp_SecureHashType=SHA512&vnp_SecureHash=${signed}`;

  return paymentUrl;
};
