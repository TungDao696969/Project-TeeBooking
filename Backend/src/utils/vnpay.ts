import crypto from "crypto";
import qs from "qs";

export const sortObject = (obj: Record<string, any>) => {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();

  keys.forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== "") {
      sorted[key] = String(value);
    }
  });

  return sorted;
};

export const buildVnpaySignData = (data: Record<string, any>) => {
  const sortedData = sortObject(data);
  const encodedData = Object.fromEntries(
    Object.entries(sortedData).map(([key, value]) => [
      encodeURIComponent(key),
      encodeURIComponent(value).replace(/%20/g, "+"),
    ]),
  );

  return qs.stringify(encodedData, { encode: false });
};

export const createSecureHash = (data: Record<string, any>, secret: string) => {
  const signData = buildVnpaySignData(data);

  return crypto
    .createHmac("sha512", secret)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");
};

export const buildVnpayPaymentUrl = (
  vnpUrl: string,
  params: Record<string, any>,
  secret: string,
) => {
  const signData = buildVnpaySignData(params);
  const secureHash = createSecureHash(params, secret);

  return `${vnpUrl}?${signData}&vnp_SecureHashType=SHA512&vnp_SecureHash=${secureHash}`;
};

export const toVnpayTxnRef = (paymentId: string) => {
  return paymentId.replace(/-/g, "");
};

export const fromVnpayTxnRef = (txnRef: string) => {
  if (/^[0-9a-fA-F]{32}$/.test(txnRef)) {
    return txnRef.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      "$1-$2-$3-$4-$5",
    );
  }

  return txnRef;
};
