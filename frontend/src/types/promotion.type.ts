export interface Promotion {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;

  type: "percentage" | "fixed_amount" | "combo";

  discountValue: number;
  minOrderValue: number | null;
  maxDiscount: number | null;

  startDate: string;
  endDate: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface PromotionDetailResponse {
  success: boolean;
  data: Promotion;
}

export interface PromotionsResponse {
  success: boolean;

  data: Promotion[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
