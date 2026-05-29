export interface TicketType {
  id: string;
  name: string;
  type: string;
  price: number | string;
  description: string;
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
