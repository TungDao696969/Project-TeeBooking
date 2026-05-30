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
