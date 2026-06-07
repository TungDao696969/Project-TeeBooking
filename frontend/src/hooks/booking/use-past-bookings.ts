import { useQuery } from "@tanstack/react-query";
import { getPastBookingsService } from "@/services/booking.api";
interface Props {
  page: number;
  status?: string;
  search?: string;
}

export const usePastBookings = ({ page, status, search }: Props) => {
  return useQuery({
    queryKey: ["past-bookings", page, status, search],

    queryFn: () => getPastBookingsService(page, status, search),
  });
};
