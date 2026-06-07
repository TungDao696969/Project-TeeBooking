export interface TicketType {
  id: string;
  name: string;
  type: string;
  price: number | string;
  description: string;
  showtimeSeat: {
    id: string;
    seatId: string;
    status: string;
    seat: {
      seatCode: string;
    };
  };
}

export interface ShowtimeDetail {
  id: string;
  startTime: string;
  endTime: string;
  format: string;
  language: string;
  subtitle: string;

  cinema: {
    id: string;
    name: string;
    address: string;
  };

  room: {
    id: string;
    name: string;
  };

  movie: {
    id: string;
    title: string;
    posterUrl: string;
    ageRating: string;
  };
}

export interface TicketTypeResponse {
  success: boolean;

  data: {
    showtime: ShowtimeDetail;
    ticketTypes: TicketType[];
  };
}

export type Payment = {
  id: string;
  paymentMethod: string;
  paymentGateway: string;
  transactionCode: string;
  amount: number;
  status: string;
  paidAt: string | null;
};

export type ShowTime = {
  id: string;

  movie: {
    id: string;
    title: string;
    posterUrl: string;
    durationMinutes: number;
  };

  room: {
    id: string;
    roomName: string;

    cinema: {
      id: string;
      name: string;
      address: string;
    };
  };

  showDate: string;
  startTime: string;
  endTime: string;
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "refunded";

export interface PastBooking {
  id: string;
  bookingCode: string;
  status: BookingStatus;
  finalAmount: number;
  bookedAt: string;

  showtime: {
    startTime: string;
    date: string;

    movie: {
      title: string;
      posterUrl: string;
    };

    cinema: {
      name: string;
    };
  };

  tickets: {
    showtimeSeat: {
      seat: {
        seatCode: string;
      };
    };
  }[];

  payments: {
    status: BookingStatus;
    paymentMethod: string;
  }[];
}

export interface PastBookingResponse {
  success: boolean;
  data: PastBooking[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
