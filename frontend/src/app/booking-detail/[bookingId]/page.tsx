"use client";

import { useParams } from "next/navigation";
import { useBooking } from "@/hooks/booking/use-booking";

import BookingHeader from "@/components/booking/booking-detail/booking-header";
import BookingMovie from "@/components/booking/booking-detail/booking-movie";
import BookingSeats from "@/components/booking/booking-detail/booking-seats";
import BookingCombos from "@/components/booking/booking-detail/booking-combos";
import BookingPayment from "@/components/booking/booking-detail/booking-payment";
import BookingSummary from "@/components/booking/booking-detail/booking-summary";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function BookingPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const { data: booking, isLoading } = useBooking(bookingId);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!booking) {
    return <div className="p-6">No booking found</div>;
  }

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <BookingHeader booking={booking} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <BookingMovie showtime={booking.showtime} />
            <BookingSeats tickets={booking.tickets} />
            <BookingCombos combos={booking.combos} />
            <BookingPayment payments={booking.payments} />
          </div>

          <div>
            <BookingSummary booking={booking} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
