// "use client";

// import { useParams } from "next/navigation";

// import { useCreatePayment } from "@/hooks/payment/use-create-payment";

// import { useEffect } from "react";

// import Image from "next/image";
// import PaymentWatcher from "@/components/payment/payment-watcher";
// export default function PaymentPage() {
//   const params = useParams();

//   const bookingId = params.bookingId as string;

//   const paymentMutation = useCreatePayment();

//   useEffect(() => {
//     console.log("URL BOOKING ID =", bookingId);
//     paymentMutation.mutate(bookingId);
//   }, [bookingId]);

//   if (paymentMutation.isPending) {
//     return <div>Loading...</div>;
//   }

//   const payment = paymentMutation.data;

//   if (!payment) {
//     return null;
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <div className="max-w-md mx-auto rounded-xl border p-6 space-y-4">
//         <h1 className="text-xl font-bold">Thanh toán</h1>

//         <Image
//           src={payment.qrUrl}
//           alt="QR"
//           width={300}
//           height={300}
//           className="mx-auto"
//         />

//         <div>
//           Mã đơn:
//           {payment.bookingCode}
//         </div>

//         <div>
//           Số tiền:
//           {payment.amount.toLocaleString()}đ
//         </div>

//         <PaymentWatcher bookingId={bookingId} />
//       </div>
//     </div>
//   );
// }

export default function PaymentPageDummy() {
  return null;
}
