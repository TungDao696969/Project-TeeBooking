"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySePaySignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const verifySePaySignature = (req, res, next) => {
    const signature = req.headers["x-sepay-signature"];
    console.log("SEPAY WEBHOOK HEADERS:", req.headers);
    if (!signature) {
        console.log("SEPAY WEBHOOK FAILED: Missing signature");
        return res.status(401).json({
            message: "Missing signature",
        });
    }
    const rawBody = req.rawBody;
    const timestamp = req.headers["x-sepay-timestamp"];
    if (!timestamp) {
        console.log("SEPAY WEBHOOK FAILED: Missing timestamp");
        return res.status(401).json({
            message: "Missing timestamp",
        });
    }
    const dataToVerify = `${timestamp}.${rawBody}`;
    const expected = crypto_1.default
        .createHmac("sha256", process.env.SEPAY_WEBHOOK_SECRET)
        .update(dataToVerify)
        .digest("hex");
    const expectedSignature = `sha256=${expected}`;
    if (signature !== expectedSignature) {
        console.log("SEPAY WEBHOOK FAILED: Signature mismatch. Expected:", expectedSignature, "Got:", signature);
        return res.status(401).json({
            message: "Invalid signature",
        });
    }
    next();
};
exports.verifySePaySignature = verifySePaySignature;
//# sourceMappingURL=sepay-signature.middleware.js.map