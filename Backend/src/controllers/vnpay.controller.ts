// import { Request, Response } from "express";
// import { createVnpaySecureHash } from "../utils/vnpay";
// import {
//   completePaymentService,
//   failPaymentService,
// } from "../services/payment.service";
// import { PaymentMethod } from "../generated/prisma/enums";
// import { fromVnpayTxnRef } from "../utils/vnpay";

// export const vnpayReturnController = async (req: Request, res: Response) => {
//   try {
//     const secretKey = process.env.VNP_HASH_SECRET!;

//     const vnpParams = Object.fromEntries(
//       Object.entries(req.query).map(([key, value]) => {
//         const queryValue = Array.isArray(value) ? value[0] : value;
//         return [key, queryValue === undefined ? undefined : String(queryValue)];
//       }),
//     ) as Record<string, string | undefined>;
//     const secureHash = vnpParams.vnp_SecureHash;

//     console.log("[VNPAY RETURN] vnpParams=", JSON.stringify(vnpParams));

//     delete vnpParams.vnp_SecureHash;
//     delete vnpParams.vnp_SecureHashType;

//     const signed = createVnpaySecureHash(vnpParams, secretKey);

//     if (secureHash?.toLowerCase() !== signed.toLowerCase()) {
//       throw new Error("Invalid checksum");
//     }

//     const paymentId = vnpParams.vnp_TxnRef
//       ? fromVnpayTxnRef(vnpParams.vnp_TxnRef)
//       : undefined;
//     const responseCode = vnpParams.vnp_ResponseCode;
//     const transactionCode = vnpParams.vnp_TransactionNo;
//     const amount = Number(vnpParams.vnp_Amount) / 100;

//     if (!paymentId) {
//       throw new Error("Missing payment reference");
//     }

//     if (responseCode === "00") {
//       await completePaymentService({
//         paymentId,
//         paymentMethod: PaymentMethod.vnpay,
//         amount,
//         transactionCode,
//       });

//       return res.redirect("http://localhost:3000/payment-success");
//     }

//     await failPaymentService(paymentId);

//     return res.redirect("http://localhost:3000/payment-failed");
//   } catch (error: any) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
