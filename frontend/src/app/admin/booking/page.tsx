"use client";

import BookingTable from "@/components/admin/booking/booking-table";
import { useAdminBookings } from "@/hooks/admin/booking/use-bookings";
import { useAdminBookingStore } from "@/store/admin/booking.store";

export default function AdminBookingPage() {
  const { page, limit, search, statusFilter } = useAdminBookingStore();
  const { data, isLoading } = useAdminBookings(page, limit, search, statusFilter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bookings</h1>
      <BookingTable bookings={data?.bookings || []} />
    </div>
  );
}
