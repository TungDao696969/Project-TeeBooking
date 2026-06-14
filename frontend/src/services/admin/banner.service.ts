import { BannerDetailResponse, BannerResponse } from "@/types/admin/banner.type";
import api from "@/lib/axios";

export const getBanners = async () => {
  const { data } = await api.get<BannerResponse>("/admin/banners");
  return data.data;
};

export const getBannerById = async (id: string) => {
  const { data } = await api.get<BannerDetailResponse>(`/banner/${id}`);
  return data.data;
};

export const createBanner = async (formData: FormData) => {
  const { data } = await api.post("/banner", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

export const updateBanner = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await api.patch(`/banner/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

export const deleteBanner = async (id: string) => {
  const { data } = await api.delete(`/banner/${id}`);
  return data;
};
