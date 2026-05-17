"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVNPayIPN = exports.handleVNPayReturn = exports.createVNPayPayment = void 0;
const prisma_1 = require("../utils/prisma");
const vnpay_1 = require("../utils/vnpay");
const enums_1 = require("../generated/prisma/enums");
const payment_success_queue_1 = require("../queue/payment-success.queue");
const createVNPayPayment = async (bookingId, ipAddr = "127.0.0.1") => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id: bookingId },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    const payment = await prisma_1.prisma.payment.create({
        data: {
            bookingId,
            paymentMethod: enums_1.PaymentMethod.vnpay,
            paymentGateway: "VNPAY",
            amount: booking.finalAmount,
            status: "pending",
        },
    });
    return payment;
};
exports.createVNPayPayment = createVNPayPayment;
const handleVNPayReturn = async (query) => {
    const vnpParams = { ...query };
    const secureHash = vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;
    const secretKey = process.env.VNP_HASH_SECRET;
    if (!secretKey) {
        throw new Error("Missing VNPay configuration");
    }
    const checkHash = (0, vnpay_1.createSecureHash)(vnpParams, secretKey);
    if (String(secureHash).toLowerCase() !== checkHash.toLowerCase()) {
        throw new Error("Invalid checksum");
    }
    const paymentId = (0, vnpay_1.fromVnpayTxnRef)(String(vnpParams.vnp_TxnRef));
    const responseCode = vnpParams.vnp_ResponseCode;
    if (responseCode === "00") {
        await markPaymentPaid(paymentId, String(vnpParams.vnp_TransactionNo));
        return "success";
    }
    await markPaymentFailed(paymentId);
    return "failed";
};
exports.handleVNPayReturn = handleVNPayReturn;
const handleVNPayIPN = async (query) => {
    const vnpParams = { ...query };
    const secureHash = vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;
    const secretKey = process.env.VNP_HASH_SECRET;
    if (!secretKey) {
        return {
            RspCode: "99",
            Message: "Missing VNPay configuration",
        };
    }
    const checkHash = (0, vnpay_1.createSecureHash)(vnpParams, secretKey);
    if (String(secureHash).toLowerCase() !== checkHash.toLowerCase()) {
        return {
            RspCode: "97",
            Message: "Invalid checksum",
        };
    }
    const paymentId = (0, vnpay_1.fromVnpayTxnRef)(String(vnpParams.vnp_TxnRef));
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { id: paymentId },
    });
    if (!payment) {
        return {
            RspCode: "01",
            Message: "Order not found",
        };
    }
    if (payment.status === "paid") {
        await (0, payment_success_queue_1.enqueuePaymentSuccessJob)(payment.bookingId);
        return {
            RspCode: "02",
            Message: "Already confirmed",
        };
    }
    if (vnpParams.vnp_ResponseCode === "00") {
        await markPaymentPaid(paymentId, String(vnpParams.vnp_TransactionNo));
    }
    else {
        await markPaymentFailed(paymentId);
    }
    return {
        RspCode: "00",
        Message: "Confirm Success",
    };
};
exports.handleVNPayIPN = handleVNPayIPN;
const markPaymentPaid = async (paymentId, transactionCode) => {
    const bookingId = await prisma_1.prisma.$transaction(async (tx) => {
        const payment = await tx.payment.findUnique({
            where: { id: paymentId },
        });
        if (!payment)
            return null;
        if (payment.status === "paid") {
            return payment.bookingId;
        }
        await tx.payment.update({
            where: { id: paymentId },
            data: {
                status: "paid",
                paidAt: new Date(),
                transactionCode,
            },
        });
        await tx.booking.update({
            where: { id: payment.bookingId },
            data: {
                status: "confirmed",
                paymentStatus: "paid",
            },
        });
        return payment.bookingId;
    });
    if (bookingId) {
        await (0, payment_success_queue_1.enqueuePaymentSuccessJob)(bookingId);
    }
};
const markPaymentFailed = async (paymentId) => {
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { id: paymentId },
    });
    if (!payment || payment.status === "paid")
        return;
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.payment.update({
            where: { id: paymentId },
            data: {
                status: "failed",
            },
        });
        await tx.booking.update({
            where: { id: payment.bookingId },
            data: {
                paymentStatus: "failed",
            },
        });
    });
};
//# sourceMappingURL=payment.service.js.map