import BookingComboReset from "@/components/booking/booking-combo-reset";
import BookingSeatSection from "@/components/booking/booking-seat-section";
import BookingSummary from "@/components/booking/booking-summary";
import BookingTicketTypes from "@/components/booking/booking-ticket-types";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import ComboList from "@/components/combos/combo-list";

interface Props {
  params: Promise<{
    showtimeId: string;
  }>;
}

export default async function BookingPage({ params }: Props) {
  const { showtimeId } = await params;

  return (
    <>
      <Header />

      <main className="">
        <BookingComboReset showtimeId={showtimeId} />

        <BookingTicketTypes showtimeId={showtimeId} />

        <div className="mt-10">
          <BookingSeatSection showtimeId={showtimeId} />
        </div>

        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 mt-10">
          <div className="w-full">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white">Chọn Bắp Nước</h1>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
              <ComboList />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <BookingSummary />
        </div>
      </main>

      <Footer />
    </>
  );
}
