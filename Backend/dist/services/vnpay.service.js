"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVnpayPaymentUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dayjs_1 = __importDefault(require("dayjs"));
const vnpay_1 = require("../utils/vnpay");
const createVnpayPaymentUrl = (paymentId, amount, ipAddr) => {
    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;
    const createDate = (0, dayjs_1.default)().format("YYYYMMDDHHmmss");
    const params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: (0, vnpay_1.toVnpayTxnRef)(paymentId),
        vnp_OrderInfo: `Thanh toan booking ${paymentId}`,
        vnp_OrderType: "other",
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };
    const signData = (0, vnpay_1.buildVnpaySignData)(params);
    const signed = crypto_1.default
        .createHmac("sha512", secretKey)
        .update(Buffer.from(signData, "utf-8"))
        .digest("hex");
    const paymentUrl = `${vnpUrl}?${signData}&vnp_SecureHashType=SHA512&vnp_SecureHash=${signed}`;
    return paymentUrl;
};
exports.createVnpayPaymentUrl = createVnpayPaymentUrl;
//# sourceMappingURL=vnpay.service.js.map