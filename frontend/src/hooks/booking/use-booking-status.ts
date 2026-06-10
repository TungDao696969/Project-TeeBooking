import { useQuery } from "@tanstack/react-query";

import { getBookingStatus } from "@/services/booking.api";

export const useBookingStatus = (bookingId: string) => {
  return useQuery({
    queryKey: ["booking-status", bookingId],

    queryFn: () => getBookingStatus(bookingId),

    refetchInterval: 5000,

    enabled: !!bookingId,
  });
};
