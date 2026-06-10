import { useMutation } from "@tanstack/react-query";

import { createPayment } from "@/services/payment.api";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};
