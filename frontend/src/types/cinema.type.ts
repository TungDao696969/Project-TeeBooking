export interface Cinema {
  id: string;
  name: string;
  slug: string;
  hotline: string;
  cityId: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  createdAt: string;
  updatedAt: string;
}
export interface TrashMoviesResponse {
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
  createdAt: string;
  latitude: string;
  longitude: string;
}

export interface CinemaPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* LIST RESPONSE */
export interface CinemasResponse {
  success: boolean;
  data: Cinema[];
  pagination: CinemaPagination;
}

/* DETAIL RESPONSE */
export interface CinemaDetailResponse {
  success: boolean;
  data: CinemaDetail;
}

export interface ShowtimeSummary {
  id: string;
  time: string;
  endTime: string;
  roomName: string;
  basePrice: number;
}

export interface FormatGroup {
  type: string;
  showtimes: ShowtimeSummary[];
}

export interface DateGroup {
  date: string;
  formats: FormatGroup[];
}

export interface CinemaMovie {
  movie: {
    id: string;
    title: string;
    slug: string;
    posterUrl: string;
    durationMinutes: number;
    ageRating: string;
    status: "now_showing" | "coming_soon" | "ended" | string;
    country: string;
    genres: string[];
  };
  dates: DateGroup[];
}

export interface CinemaShowtimeResponse {
  success: boolean;
  count: number;
  data: CinemaMovie[];
}
