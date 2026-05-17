"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateSignature = (rawSignature, secretKey) => {
    return crypto_1.default
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");
};
exports.generateSignature = generateSignature;
//# sourceMappingURL=momo.js.map