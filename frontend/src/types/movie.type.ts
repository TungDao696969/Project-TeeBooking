export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Cast {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  nationality: string;
  roleType: string;
  characterName: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
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
  showTimes: Showtime[];
  relatedMovies: Movie[];
}

export interface Ratings {
  averageRating: number;
  totalReviews: number;
}

export interface Showtime {
  id: string;
  date: string; // "2025-06-01T00:00:00.000Z"
  startTime: string; // "14:30"
  endTime: string; // "17:00"
  hall: string; // "Hall 1"
  cinema: {
    id: string;
    name: string;
    address: string;
  };
  availableSeats: number;
  totalSeats: number;
  price: number;
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
