"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.momoReturnController = exports.momoIPNController = exports.createMoMoController = exports.vnpayIPNController = exports.vnpayReturnController = exports.createVnpayPaymentController = void 0;
const payment_service_1 = require("../services/payment.service");
const vnpay_service_1 = require("../services/vnpay.service");
const momo_service_1 = require("../services/momo.service");
const getPaymentRedirectUrl = (status) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    return `${frontendUrl}/payment-${status}`;
};
const createVnpayPaymentController = async (req, res) => {
    try {
        const { bookingId } = req.body;
        if (!bookingId) {
            throw new Error("Missing bookingId");
        }
        const payment = await (0, payment_service_1.createVNPayPayment)(bookingId);
        const amount = Number(payment.amount);
        const ipAddr = req.headers["x-forwarded-for"] ||
            req.ip ||
            "127.0.0.1";
        const paymentUrl = (0, vnpay_service_1.createVnpayPaymentUrl)(payment.id, amount, ipAddr);
        console.log("[VNPAY] create payment", {
            bookingId,
            paymentId: payment.id,
            amount,
            ipAddr,
        });
        return res.status(200).json({
            success: true,
            paymentUrl,
        });
    }
    catch (error) {
        console.error("[VNPAY] create error", {
            error: error?.message,
            stack: error?.stack,
            body: req.body,
        });
        return res.status(400).json({
            success: false,
            message: error.message ?? "Failed to create VNPay payment",
        });
    }
};
exports.createVnpayPaymentController = createVnpayPaymentController;
const vnpayReturnController = async (req, res) => {
    try {
        const status = await (0, payment_service_1.handleVNPayReturn)(req.query);
        return res.redirect(getPaymentRedirectUrl(status));
    }
    catch (error) {
        console.error("[VNPAY] return error", {
            message: error?.message,
            stack: error?.stack,
            query: req.query,
        });
        return res.redirect(getPaymentRedirectUrl("failed"));
    }
};
exports.vnpayReturnController = vnpayReturnController;
const vnpayIPNController = async (req, res) => {
    try {
        const result = await (0, payment_service_1.handleVNPayIPN)(req.query);
        return res.json(result);
    }
    catch (error) {
        console.error("[VNPAY] IPN error", {
            message: error?.message,
            stack: error?.stack,
            query: req.query,
        });
        return res.json({
            RspCode: "99",
            Message: "Unknown error",
        });
    }
};
exports.vnpayIPNController = vnpayIPNController;
// MOMO
const createMoMoController = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const payUrl = await (0, momo_service_1.createMoMoPayment)(bookingId);
        return res.json({
            success: true,
            payUrl,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createMoMoController = createMoMoController;
const momoIPNController = async (req, res) => {
    try {
        const result = await (0, momo_service_1.handleMoMoIPN)(req.body);
        return res.json(result);
    }
    catch (error) {
        console.error("[MOMO] IPN error", {
            message: error?.message,
            stack: error?.stack,
            body: req.body,
        });
        return res.status(400).json({
            message: error.message || "Invalid MoMo IPN",
        });
    }
};
exports.momoIPNController = momoIPNController;
const momoReturnController = async (req, res) => {
    try {
        const status = await (0, momo_service_1.handleMoMoReturn)(req.query);
        return res.redirect(getPaymentRedirectUrl(status));
    }
    catch (error) {
        console.error("[MOMO] return error", {
            message: error?.message,
            stack: error?.stack,
            query: req.query,
        });
        return res.redirect(getPaymentRedirectUrl("failed"));
    }
};
exports.momoReturnController = momoReturnController;
//# sourceMappingURL=payment.controller.js.map