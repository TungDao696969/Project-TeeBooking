"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceNumber = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const generateInvoiceNumber = () => {
    const randomSuffix = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `INV-${(0, dayjs_1.default)().format("YYYYMMDDHHmmssSSS")}-${randomSuffix}`;
};
exports.generateInvoiceNumber = generateInvoiceNumber;
//# sourceMappingURL=invoice.utils.js.map