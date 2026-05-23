import api from "@/lib/axios";
import { PromotionsResponse } from "@/types/promotion.type";
import { Promotion, PromotionDetailResponse } from "@/types/promotion.type";

export const getPromotions = async (): Promise<Promotion[]> => {
  const response = await api.get<PromotionsResponse>("/promotion");

  return response.data.data;
};

export const getPromotionDetail = async (id: string): Promise<Promotion> => {
  const response = await api.get<PromotionDetailResponse>(`/promotion/${id}`);

  return response.data.data;
};
