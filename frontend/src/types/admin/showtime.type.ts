export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  showDate: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  format: string;
  language: string;
  subtitle: string;
  isActive: boolean;

  movie: {
    id: string;
    title: string;
    posterUrl: string;
  };

  room: {
    id: string;
    roomName: string;
  };
}

export interface ShowtimeResponse {
  success: boolean;
  count: number;
  data: Showtime[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ShowtimePayload {
  movieId: string;
  roomId: string;
  showDate: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  format: string;
  language: string;
  subtitle: string;
  isActive?: boolean;
}
