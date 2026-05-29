import { useMutation } from "@tanstack/react-query";

import { createMoMoPayment } from "@/services/payment.api";

export const useCreateMoMo = () => {
  return useMutation({
    mutationFn: createMoMoPayment,
  });
};
