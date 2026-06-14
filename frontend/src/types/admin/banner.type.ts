export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannerResponse {
  success: boolean;
  data: Banner[];
}

export interface BannerDetailResponse {
  success: boolean;
  data: Banner;
}
