export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  posterUrl: string;
  genres?: string[] | {
    id: string;
    name: string;
  }[];
  trailerUrl?: string;
  durationMinutes?: number;
  ageRating?: string;
  status: "coming_soon" | "now_showing" | "ended" | string;
  language?: string;
  subtitle?: string;
  country?: string;
}

export interface Cinema {
  id: string;
  name: string;
  slug: string;
  address: string;
  hotline: string;
  openingHours: string;
}

export interface Promotion {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
}

export interface HomeResponse {
  banners: Banner[];
  nowShowing: Movie[];
  comingSoon: Movie[];
  cinemas: Cinema[];
  promotions: Promotion[];
  blogs: Blog[];
}
