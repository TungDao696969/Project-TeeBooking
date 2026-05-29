export interface ShowtimeResponse {
  success: boolean;
  data: CinemaShowtime[];
}

export interface CinemaShowtime {
  cinema: {
    id: string;
    name: string;
    slug: string;
    address: string;
    province: string;
  };

  dates: ShowtimeDate[];
}

export interface ShowtimeDate {
  date: string;

  showtimes: ShowtimeItem[];
}

export interface ShowtimeItem {
  id: string;

  startTime: string;
  endTime: string;

  format: string;

  language: string;
  subtitle: string;

  basePrice: number;

  room: {
    id: string;
    name: string;
  };
}
