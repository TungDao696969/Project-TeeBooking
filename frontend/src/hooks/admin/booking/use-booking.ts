import { useQuery } from "@tanstack/react-query";
import { getAdminBookingById } from "@/services/admin/booking.service";

export const useAdminBookingDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin-booking-detail", id],
    queryFn: () => getAdminBookingById(id),
    enabled: !!id,
  });
};
