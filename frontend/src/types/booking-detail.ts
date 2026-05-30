export interface Booking {
  id: string;
  bookingCode: string;
  totalTicketPrice: number;
  totalComboPrice: number;
  finalAmount: number;
  status: string;
  paymentStatus: string;

  showtime: {
    movie: {
      title: string;
      posterUrl: string;
      durationMinutes: number;
    };
    room: {
      roomName: string;
      cinema: {
        name: string;
        address: string;
      };
    };
    showDate: string;
  };

  tickets: {
    id: string;
    ticketPrice: number;
    showtimeSeat: {
      seat: {
        seatCode: string;
      };
    };
  }[];

  combos: {
    quantity: number;
    totalPrice: number;
    combo: {
      name: string;
      imageUrl: string;
    };
  }[];

  payments: {
    paymentMethod: string;
    amount: number;
    status: string;
    paidAt: string;
  }[];
}

export type BookingSummaryType = {
  totalTicketPrice: number;
  totalComboPrice: number;
  finalAmount: number;
};

export type BookingCombo = {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

  combo: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  };
};
