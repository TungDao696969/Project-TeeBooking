import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/services/booking.api";

export const useBooking = (bookingId?: string) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId,
  });
};
