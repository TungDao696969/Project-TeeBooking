"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromVnpayTxnRef = exports.toVnpayTxnRef = exports.buildVnpayPaymentUrl = exports.createSecureHash = exports.buildVnpaySignData = exports.sortObject = void 0;
const crypto_1 = __importDefault(require("crypto"));
const qs_1 = __importDefault(require("qs"));
const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        const value = obj[key];
        if (value !== undefined && value !== null && value !== "") {
            sorted[key] = String(value);
        }
    });
    return sorted;
};
exports.sortObject = sortObject;
const buildVnpaySignData = (data) => {
    const sortedData = (0, exports.sortObject)(data);
    const encodedData = Object.fromEntries(Object.entries(sortedData).map(([key, value]) => [
        encodeURIComponent(key),
        encodeURIComponent(value).replace(/%20/g, "+"),
    ]));
    return qs_1.default.stringify(encodedData, { encode: false });
};
exports.buildVnpaySignData = buildVnpaySignData;
const createSecureHash = (data, secret) => {
    const signData = (0, exports.buildVnpaySignData)(data);
    return crypto_1.default
        .createHmac("sha512", secret)
        .update(Buffer.from(signData, "utf-8"))
        .digest("hex");
};
exports.createSecureHash = createSecureHash;
const buildVnpayPaymentUrl = (vnpUrl, params, secret) => {
    const signData = (0, exports.buildVnpaySignData)(params);
    const secureHash = (0, exports.createSecureHash)(params, secret);
    return `${vnpUrl}?${signData}&vnp_SecureHashType=SHA512&vnp_SecureHash=${secureHash}`;
};
exports.buildVnpayPaymentUrl = buildVnpayPaymentUrl;
const toVnpayTxnRef = (paymentId) => {
    return paymentId.replace(/-/g, "");
};
exports.toVnpayTxnRef = toVnpayTxnRef;
const fromVnpayTxnRef = (txnRef) => {
    if (/^[0-9a-fA-F]{32}$/.test(txnRef)) {
        return txnRef.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
    }
    return txnRef;
};
exports.fromVnpayTxnRef = fromVnpayTxnRef;
//# sourceMappingURL=vnpay.js.map