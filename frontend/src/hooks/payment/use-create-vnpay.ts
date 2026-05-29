import { useMutation } from "@tanstack/react-query";

import { createVNPayPayment } from "@/services/payment.api";

export const useCreateVNPay = () => {
  return useMutation({
    mutationFn: createVNPayPayment,
  });
};
