export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Cast {
  id: string;
  movieId: string;
  personId: string;
  roleType: string; // "director" | "actor"
  characterName: string | null;
  fullName?: string;
  avatarUrl?: string | null;
  nationality?: string;
}

export interface Review {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  // Optional user details (if populated)
  user?: {
    id: string;
    fullName?: string;
    avatarUrl?: string | null;
  };
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  originalTitle: string;
  description: string;
  durationMinutes: number;
  releaseDate: string;
  ageRating: string;
  language: string;
  subtitle: string;
  trailerUrl: string;
  posterUrl: string;
  bannerUrl: string;
  status: string;
  country: string;
  producer: string;
  genres: Genre[];
  casts: Cast[];
  ratings: {
    averageRating: number;
    totalReviews: number;
  };
  reviews: Review[];
  showtimes: Showtime[];
  relatedMovies: Movie[];
}

export interface Ratings {
  averageRating: number;
  totalReviews: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  showDate: string; // "2026-05-20T07:27:11.913Z"
  startTime: string; // "2026-05-08T12:00:00.000Z"
  endTime: string; // "2026-05-08T14:30:00.000Z"
  basePrice: number;
  format: string; // "2D" | "3D"
  language: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
  // Optional fields if available from API
  cinema?: {
    id: string;
    name: string;
    address: string;
  };
  room?: {
    id: string;
    name: string;
    totalSeats: number;
  };
  availableSeats?: number;
}

export interface ShowtimeSectionProps {
  showtimes: Showtime[];
  status: string; // "now_showing" | "coming_soon" | "ended"
  releaseDate: string;
}

export interface RelatedMovie {
  id: string;
  title: string;
  slug: string;
  posterUrl: string;
  durationMinutes: number;
  genres: { id: string; name: string }[];
  ratings?: { averageRating: number };
  status: "now_showing" | "coming_soon" | "ended";
}

export interface MovieDetailResponse {
  success: boolean;

  data: {
    movie: Movie;
    genres: Genre[];
    casts: Cast[];

    ratings: {
      averageRating: number;
      totalReviews: number;
    };

    reviews: Review[];
  };
}
