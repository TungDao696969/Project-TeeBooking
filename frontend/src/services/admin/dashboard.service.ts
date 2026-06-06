import api from "@/lib/axios";
import { DashboardResponse } from "@/types/admin/dashboard.type";

export const getDashboardStats = async () => {
  const response = await api.get<DashboardResponse>("/admin/dashboard");
  console.log(response.data);
  return response.data.data.stats;
};
