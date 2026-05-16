import crypto from "crypto";

export const generateSignature = (rawSignature: string, secretKey: string) => {
  return crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
};
