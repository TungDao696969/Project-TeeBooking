import { create } from "zustand";
import { Banner } from "@/types/admin/banner.type";

interface BannerStore {
  selectedBanner: Banner | null;
  setSelectedBanner: (banner: Banner | null) => void;
}

export const useBannerStore = create<BannerStore>((set) => ({
  selectedBanner: null,

  setSelectedBanner: (banner) =>
    set({
      selectedBanner: banner,
    }),
}));
