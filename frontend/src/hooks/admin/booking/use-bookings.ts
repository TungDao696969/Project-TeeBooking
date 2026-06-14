import { useQuery } from "@tanstack/react-query";
import { getAdminBookings } from "@/services/admin/booking.service";
import { BookingStatus } from "@/types/admin/booking.type";

export const useAdminBookings = (
  page: number,
  limit: number,
  search?: string,
  status?: BookingStatus | "all"
) => {
  return useQuery({
    queryKey: ["admin-bookings", page, limit, search, status],
    queryFn: () =>
      getAdminBookings({
        page,
        limit,
        search,
        status: status === "all" ? undefined : status,
      }),
  });
};
