export interface Cinema {
  id: string;
  name: string;
  slug: string;
}

export interface CinemaResponse {
  success: boolean;
  data: Cinema[];
}

export interface Room {
  id: string;
  roomName: string;
  roomType: string;
  totalSeats: number;
  screenType: string;
  soundSystem: string;
}

export interface CinemaDetail {
  id: string;
  name: string;
  slug: string;
  hotline: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  openingHours: string;
  rooms: Room[];
}

export interface CinemasResponse {
  success: boolean;
  data: CinemaDetail;
}

export interface ShowtimeItem {
  id: string;
  time: string;
  endTime: string;
  roomName: string;
  basePrice: number;
}

export interface FormatGroup {
  type: string;
  showtimes: ShowtimeItem[];
}

export interface DateGroup {
  date: string;
  formats: FormatGroup[];
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  posterUrl: string;
  durationMinutes: number;
  ageRating: string;
  status: string;
  country: string;
  genres: string[];
}

export interface CinemaMovie {
  movie: Movie;
  dates: DateGroup[];
}

export interface CinemaShowtimeResponse {
  success: boolean;
  count: number;
  data: CinemaMovie[];
}
