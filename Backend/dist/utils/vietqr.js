"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVietQR = void 0;
const generateVietQR = (amount, bookingCode) => {
    const bankBin = process.env.BANK_BIN;
    const accountNumber = process.env.BANK_ACCOUNT;
    return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${bookingCode}`;
};
exports.generateVietQR = generateVietQR;
//# sourceMappingURL=vietqr.js.map